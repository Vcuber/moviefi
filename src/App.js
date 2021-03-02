import './App.css';
import './components.css';
import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import MovieList from './components/SearchBar/MovieList';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieHeading from './components/SearchBar/MovieHeading';
import SearchBox from './components/SearchBar/SearchBox';
import AddFavourite from './components/SearchBar/AddFavourites';
import RemoveFavourites from './components/SearchBar/RemoveFavourites';

function App() {

  const[movies, setMovies] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [favourites, setFavourites] = useState([]);


  const getMovieRequest = async (searchData) => {
    const url = `https://www.omdbapi.com/?s=${searchData}&apikey=fba40dba`

    try {
      const response = await fetch(url);
      const respJson = await response.json();
    
      if(respJson.Search) {
        setMovies(respJson.Search);
      }
    }
    catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMovieRequest(searchData);
  }, [searchData]);

  useEffect(() => {
    const movFav = JSON.parse(localStorage.getItem('movie-app-favs'));
    
    setFavourites(movFav);
  }, [])

  const addFavourite = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavourites = (movie) => {
    const newFavouriteList = favourites.filter((favourite => favourite.imdbID !== movie.imdbID));
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const saveToLocalStorage = (items) => {
    localStorage.setItem('movie-app-favs', JSON.stringify(items));
  }

  return (
    <div className="container-fluid movie-app">
      <Helmet>
        <style>{'body { background-color: rgb(27, 27, 27);} body::-webkit-scrollbar { display: none; }'}</style>
      </Helmet>
      <nav class="navbar mt-4 sticky-top navbar-dark bg-dark ">
        <h2 class="top-logo">MovieFi</h2>
      </nav>
      <div className="d-flex align-items-center mt-4 mb-4 my-auto">
        <SearchBox searchData={searchData} setSearchData={setSearchData}/>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeading heading='Your Search Results' />
      </div>
      <div className="container-fluid movie-app">
        <div className="row">
            <MovieList 
              movies = {movies} 
              handleFavourites={addFavourite} 
              favouriteComponent = {AddFavourite} 
            />
        </div>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeading heading='Favourites' />
      </div>
      <div className="row">
        <MovieList 
            movies = {favourites} 
            handleFavourites={removeFavourites} 
            favouriteComponent = {RemoveFavourites} 
        />
      </div>
      </div>
  );
}

export default App;




//76c615684af944828a765073f7743056 TMDB API
//957c6256 OMDB