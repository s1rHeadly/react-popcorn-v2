import {useState, useEffect} from 'react'

// the initial state
// use a placeholder param of itemkey so we can call whatever localstorage object when the hook is called
const useLocalStorageState = (itemKey) => {
  const [value, setValue] = useState(function(){
    const stored = localStorage.getItem(itemKey);
    return JSON.parse(stored) || [];
});


  //local Storage on every render update
  useEffect(() => {
    localStorage.setItem(itemKey, JSON.stringify(value))
  },[value, itemKey]);

  // what we want returned
  return [value, setValue]

}


export default useLocalStorageState