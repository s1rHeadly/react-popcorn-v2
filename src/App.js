import { useState, useEffect } from "react";

import { APIKEY } from "./utils/helpers";


import Navbar from './navbar/Navbar';
import NavResults from './navbar/NavResults';
import SearchInput from './navbar/SearchInput';
import Main from './global/Main';
import MoviesList from './Movies/MoviesList';
import Summary from './watched/Summary';
import WatchedList from './watched/WatchedList';
import Box from './global/Box';
import Error from "./global/Error";
import Loader from './global/Loader';
import MovieDetails from "./watched/MovieDetails.js";





export default function App() {

  // state
   //============
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null)
  
  const [watchedMovies, setWatchedMovies] = useState(function(){
      const stored = localStorage.getItem('watchedMovies');
      return JSON.parse(stored) || [];
  });








  // functions
   //============
  const getMovieId = (id) => {
    setSelectedMovieId((prevState) => prevState !== id ? id : null)
  }


  const closeMovieDetails = () => {
      setSelectedMovieId(null) // set the selectedID ack to null so the Summary want watch list is shown (see second box component below for the condition)
  }


  const addWatchedMovie = (movie) => {
   
      setWatchedMovies((prevState) => (
        [...prevState, movie]
      ))


     closeMovieDetails()
  }





  // useEffects
  //============


  //local Storage 
useEffect(() => {
  localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies))
},[watchedMovies]);




  // fFetch Mmovies on Search Query
  useEffect(() => {

    const controller = new AbortController(); // this is for racing condtion handling
    
    const getMovieData = async() => {
    
      setLoading(true)

    try {
    
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${APIKEY}`, {
        signal: controller.signal,
      });

      if(!response.ok){
       throw new Error('Something went wrong')
      }

      setError(null)
      const data = await response.json();

      if(Response === 'False'){
        throw new Error(data.Error)
      }

      const results = data.Search;


      if(results){
        // update the keys for each item
        const udpatedResults = results.map(item => ({
          title: item.Title,
          poster: item.Poster,
          year: item.Year,
          id: item.imdbID,
        }));

       
        setMovies(udpatedResults)
        setLoading(false)

      }


    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
        setError(error.message);
      }

    } finally{
      setLoading(false)
    }

      if(query.length < 3){
        setMovies([]);
        setError('');
        return;
      }

  
    } // close function getData


    getMovieData(); //call getData

  // cleanup function for race conditioning
  return(() => {
    controller.abort();
  })
  }, [query]);



  return (
    <>
    <Navbar>
      <SearchInput
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for a movie title"/>

      <NavResults movies={movies}/>
    </Navbar>

      <Main>
            <Box>
              {loading && <Loader message="Loading"/>}
              {!loading && error && <Error message={error}/>}
              {!error && !loading && <MoviesList movies={movies} onSelectedId={getMovieId}/>}
            </Box>

            <Box>
              {selectedMovieId ? (<MovieDetails onCloseMovie={closeMovieDetails} selectedMovieId={selectedMovieId} onAddWatchedMovie={addWatchedMovie}/> ) : (
              <>
              <Summary watchedMovies={watchedMovies}/>
              <WatchedList watchedMovies={watchedMovies} selectedMovieId={selectedMovieId}/>
              </>
            ) }
           
            </Box>
      </Main>
    </>
  );
}
