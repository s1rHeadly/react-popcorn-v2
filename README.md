# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`



## What the application must do
- When a user types into the search field, its fetches data from the imdb movie api
- The data is then poplutated in the list on the left

- If the data is loading then we should have a loading component
- if the data fails for whatever reason we should have an error displayed

- when a user clicks on a movie, it should populate the list on the right hand side
- if the movie already exists in this list we should present a message or some sort
- 



## Personal Notes on how to approach this appplication
- Refactor the components into individual reusable components both state and stateless (globals if neeeded)
- get the value of the input field
- create the fetch request when more that 3 characters are entered - avoid race conditioning!
- 


## Notes
- when using state, try to have dummy data first before making things dynamic so we know the props are correct where needed
- Use nullish coelescance to avoid empty values
- Use Condtional rendering
- Use UseEffect as an event Listener
- Try to use the children prop to avoid lots of prop drilling
- Use prevState where needed
- Try to make components are re-usable as possible by assigning props throughout the component AND using state in a parent component to connect the two



## Issues Common or something extra
- .env files DO NOT commit to repo
- See here for a how to: https://algerwrites.medium.com/how-to-remove-env-from-git-commit-history-1d594917b376