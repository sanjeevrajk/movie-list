import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { queryMovies, refreshCache,  allMovies } from './actions/movies';
import MovieCard from './components/MovieCard';
import './App.css'; 
 
class App extends Component {
  
  state = {
    status: 'INITIAL',
    query: '',
    genre: [ { value: 'Fantasy', name: 'Fantasy' },
    { value: 'Sci-fi', name: 'Sci-fi' } ,
    { value: 'Thriller', name: 'Thriller' } ,
    { value: 'Action', name: 'Action' } ,
    { value: 'Drama', name: 'Drama' } ,
    { value: 'Crime', name: 'Crime' } ,
    { value: 'Supernatural horror', name: 'Supernatural horror' } ,
    { value: 'Biography', name: 'Biography' } ,
    { value: 'Slasher', name: 'Slasher' } ,
    { value: 'Mystery', name: 'Mystery' } ,
    { value: 'Musical', name: 'Musical' } ,
    { value: 'Comedy-drama', name: 'Comedy-drama' } ,
    { value: 'Horror', name: 'Horror' } ,  
    { value: 'Satire', name: 'Satire' }  
   ] 
  }

  async updateQuery (query) {
    
    this.setState({ query, status: 'SEARCHING' });
   
    if (query.trim()) {
      const { type } = await this.props.queryMovies(query);
      this.setState({ status: type });
    } else {
      this.setState({ status: 'INITIAL' });
    }
  }  
  refreshCache = () => this.props.refreshCache(); 
  async componentDidMount() { 
   
      const { type } = await this.props.allMovies();
      this.setState({ status: type }); 
  }

  render() {
    const { query, status } = this.state;
    const { movies } = this.props; 
    
    return (
      <div className="text-center" >
       
    

      <nav className="navbar navbar-dark bg-primary sticky-top ">
        <a className="navbar-brand" href="/">
         <i className="material-icons">movie_filter</i> 
          Movie Filter
        </a>
        <a className="nav-link" href="/" target="_blank" rel="noopener" aria-label="GitHub">
          <svg className="navbar-nav-svg" viewBox="0 0 512 499.36" role="img" focusable="false">
            <title>GitHub</title>
            <path fill="currentColor" d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"></path>
          </svg>
        </a>
      </nav>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Search for movie</h1>
          <p className="lead">Sharing a few of our favourite movies</p>
          <div className="search-field">
          <DebounceInput
              name="search"
              type="text"
              className="form-control"
              onChange={({ target }) => this.updateQuery(target.value)}
              minLength={3}
              debounceTimeout={300}
              placeholder="movie title..."
              autoFocus
            />
            <a href="/" className="search_icon"> <i className="material-icons">search</i> </a>
            </div>
        </div>
        <div className="bottom">
        <div className="float-left">Results for: {query} ({movies.length})</div>
        <div className="float-right genre-search">
          <select className="form-control"
            defaultValue="year"
            onChange={({ target }) => this.updateQuery(target.value)}
          >
            <option value={"All Genre"} >All Genre</option>
            {this.state.genre.map((result, i) => (
          <option key={i} value={result.value}>{result.name}</option>
          ))}
            
          </select> 
        </div>
        </div>
      </div>
        <div className="container-fluid justify-content-center">
           
          <hr />
          
         
          {status === 'INITIAL' && <h3>Ready to search</h3>}

          {status === 'NO_RESULT_FOUND' && <h3>No results found for: {query}</h3>}

          {status === 'SEARCHING' && <h3>Searching...</h3>} 
          {status === 'FETCHED_MOVIES' && movies && <div>
       
            <div className="row">
              {movies.map((movie) => <MovieCard key={movie.id} {...movie} />)}  
            </div> 
          </div>} 
             
          <span className="small mt-2 mb-5">Click to refresh all cache
            <button
              type="button"
              className="btn btn-outline-success btn-sm mt-5 mb-5 ml-1"
              onClick={() => this.refreshCache()}>
              /api/cache/refresh
            </button>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ movies = [] }) => ({
  movies,
});

const mapDispatchToProps = (dispatch) => ({
  queryMovies: (query) => dispatch(queryMovies(query)),
  allMovies: () => dispatch(allMovies()),
  refreshCache: () => dispatch(refreshCache()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
