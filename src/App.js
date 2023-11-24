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



// custom hook files
import useFetchMovies from "./hooks/useFetchMovies.js";





export default function App() {

  // state
   //============
  // const [movies, setMovies] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null)
  
  const [watchedMovies, setWatchedMovies] = useState(function(){
      const stored = localStorage.getItem('watchedMovies');
      return JSON.parse(stored) || [];
  });




// calling the custom hook
const{movies, loading, error} = useFetchMovies(query)






  // functions
   //============

  function getMovieId(id){
    setSelectedMovieId((prevState) => prevState !== id ? id : null)
  }


  function closeMovieDetails(){
      setSelectedMovieId(null) // set the selectedID ack to null so the Summary want watch list is shown (see second box component below for the condition)
  }


  function addWatchedMovie(movie){
   const addedMovieId = movie.imdbID; // get the id of the movie
    // if the movie already exists in the watchedMovies return true or false
   const isListed = watchedMovies.some((item) => item.imdbID === addedMovieId);
    // if it doesnt exist, then add it to the watched movies array
   if(!isListed){
      setWatchedMovies((prevState) => (
        [...prevState, movie]
      ))
   }
   closeMovieDetails()
  }


function filteredWatched(id){
        if(!id) return;
        setWatchedMovies((prevState) => prevState.filter((item) => item.imdbID !== id ?? item))
  }





  // useEffects
  //============


  //local Storage 
useEffect(() => {
  localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies))
},[watchedMovies]);






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
              <WatchedList watchedMovies={watchedMovies} selectedMovieId={selectedMovieId} onFilter={filteredWatched}/>
              </>
            ) }
           
            </Box>
      </Main>
    </>
  );
}
