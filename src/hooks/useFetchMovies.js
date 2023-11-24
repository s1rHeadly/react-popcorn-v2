import {useEffect, useState} from 'react';
import { APIKEY } from '../utils/helpers.js';

const useFetchMovies = (query) => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


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


  return {movies, loading, error} //what we want out of this hook function for the rest of the app
}

export default useFetchMovies