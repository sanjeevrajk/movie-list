  const api = "http://moviesearch2019.herokuapp.com";

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  export const allMovies = () =>
  fetch(`${api}/movies`, { headers })
  .then(res => res.json()) 
  .then(function(res) {
      console.log(res)
      return res
    });
  ;

  export const queryMovies = (query) =>
  fetch(`${api}/search?key=${query}`, { headers })
  .then(res => res.json());

  export const refreshCache = () =>
  fetch(`${api}/cache/refresh`, { headers })
  .then(res => res.json());
