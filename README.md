# Movie Search App

This is a simple React/Redux application that allows you to make a search query to the [IMDB](http://moviesearch2019.herokuapp.com) Database, and returns a list of movies that matches the query term.

 
## Get Started

##### For Development

 
* `npm install`
* `npm start`

##### For production
Running the following will build the app for production to the `build` folder:

 * `npm run build`

##### Running tests
To run the test:

* `npm test`

## Backend Server

 to perform necessary operations on the backend:

* [`queryMovies`](#queryMovies)
 

### `queryMovies`

Method Signature:

```js
queryMovies(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a `totalResults: <Number>`, `Response:<Bool>`, `Search:<Array>`.

### `refreshCache`

Method Signature:

 
* Returns a Promise which resolves to a JSON object `allExistCacheRefreshed: true`

 
 