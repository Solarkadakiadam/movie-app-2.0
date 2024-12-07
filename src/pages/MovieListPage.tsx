// src/pages/MovieListPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesAsync, setPage } from "../redux/moviesSlice";
import { RootState, AppDispatch } from "../redux/store";
import Filters from "../components/Filters";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";

const MovieListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery, year, type } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    if (searchQuery) {
      dispatch(setPage(1)); // Reset page to 1 when search query changes
      dispatch(fetchMoviesAsync({ searchQuery, page: 1, year, type }));
    }
  }, [dispatch, searchQuery, year, type]);

  return (
    <div className="movie-list-page">
      <h1>Movie List</h1>
      <Filters />
      <MovieList />
      <Pagination />
    </div>
  );
};

export default MovieListPage;