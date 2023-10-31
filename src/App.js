import { useState, useEffect } from "react";


import {tempMovieData, tempWatchedData } from './utils/data.js';


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



const APIKEY = `bb4e2f84`; // .env will not print to the console if we try to do it or inside a custom hook


export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState("");



  useEffect(() => {

    const controller = new AbortController();
    
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
        setMovies(results)
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

  // cleanup function
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
              {!error && !loading && <MoviesList movies={movies}/>}
            </Box>

            <Box>
            <Summary watched={watched}/>
            <WatchedList watched={watched}/>
            </Box>
      </Main>
    </>
  );
}
