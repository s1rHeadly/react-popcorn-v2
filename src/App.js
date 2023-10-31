import { useState } from "react";


import {tempMovieData, tempWatchedData } from './utils/data.js';


import Navbar from './navbar/Navbar';
import NavResults from './navbar/NavResults';
import SearchInput from './navbar/SearchInput';
import Main from './global/Main';
import MoviesList from './Movies/MoviesList';
import Summary from './watched/Summary';
import WatchedList from './watched/WatchedList';
import Box from './global/Box';




export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState("");



  return (
    <>
    <Navbar>
      <SearchInput />
      <NavResults movies={movies}/>
    </Navbar>

      <Main>
            <Box>
            <MoviesList movies={movies}/>
            </Box>

            <Box>
            <Summary watched={watched}/>
            <WatchedList watched={watched}/>
            </Box>
      </Main>
    </>
  );
}
