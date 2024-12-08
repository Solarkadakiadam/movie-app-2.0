import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store-";
import { Link } from "react-router-dom";

const MovieList: React.FC = () => {
  const { movies, error, loading } = useSelector(
    (state: RootState) => state.movies
  );

  return (
    <div className="movie-list-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <table className={`movie-table ${loading ? "blurred" : ""}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Release Date</th>
            <th>IMDb ID</th>
          </tr>
        </thead>
        <tbody>
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <tr key={movie.imdbID}>
                <td>
                  <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
                </td>
                <td>{movie.Year}</td>
                <td>{movie.imdbID}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>{error || "No movies found"}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
