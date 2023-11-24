  const [watchedMovies, setWatchedMovies] = useState(function(){
      const stored = localStorage.getItem('watchedMovies');
      return JSON.parse(stored) || [];
  });



  //local Storage 
  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies))
  },[watchedMovies]);






  // The reusable custom hook (called useLocalStorageState)

  // Note we are replacingwatchedMovies, setWatchedMovies to be universal
  // The itemkey is a placeholder so we can create a new localStorage object

  import {useState, useEffect} from 'react'

  const useLocalStorageState = (itemKey) => {
    const [value, setValue] = useState(function(){
      const stored = localStorage.getItem(itemKey);
      return JSON.parse(stored) || [];
  });
  
  
    //local Storage on every render update
    useEffect(() => {
      localStorage.setItem(itemKey, JSON.stringify(value))
    },[value, itemKey]);
  
    // what we want returned for later usage
    return [value, setValue]
  
  }
  
  
  export default useLocalStorageState




  // Calling the hook in our file
  // first import it
  // then call it like so
  const [watchedMovies, setWatchedMovies] = useLocalStorageState('watchedMovies') // Remember: here we are getting items from an array!

  // watchedMovies, setWatchedMovies can be called anything but for the movie app we passed down props with these names
  // the param 'watchedMovies' will create a localstorage object with that name. when we use this hook again we can call call it something else
  // This will create another object by that key