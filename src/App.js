import { useState, useEffect } from "react";

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
import useLocalStorageState from "./hooks/useLocalStorageState.js";





export default function App() {

  // state (this is now inside a custom hook)
   //==========================================
  // const [movies, setMovies] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null)
  


  // calling the custom hook for fetch 
  const {movies, loading, error} = useFetchMovies(query) // Pass in the query State as a value. Remember: here we are getting items from an object hense {}!

  //calling the custom hook for localStorageState
  const [watchedMovies, setWatchedMovies] = useLocalStorageState('moviesWatched') // Remember: here we are getting items from an array as its state !
  // inside the array we can name this anything however we have used this naming for props in other parts of the app. 
  // moviesWatched can be called watchedmovies or something else. It just means its the key we are naming in local storage




  // functions => NOTE Always use the function keyword when creating functions of this kind. IF we are using custom hook, then using arrow functions will break it we are adding them into the hook param
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
