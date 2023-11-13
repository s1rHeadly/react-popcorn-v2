
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const APIKEY = `bb4e2f84`; // .env will not print to the console if we try to do it or inside a custom hook

  const safeReturn = (str) => {
    return str ?? 'n/a';
}

  export {average, APIKEY, safeReturn}