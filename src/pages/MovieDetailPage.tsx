import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetailAsync } from "../redux/movieDetailSlice";

const MovieDetailPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { imdbID } = useParams<{ imdbID: string }>();
  const navigate = useNavigate();

  const { movieDetail, loading, error } = useSelector(
    (state: RootState) => state.movieDetail
  );

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovieDetailAsync(imdbID));
    }
  }, [dispatch, imdbID]);

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="movie-detail">
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Fetching movie details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-detail">
      <button className="back-button" onClick={handleBack}>
        &larr; Back
      </button>

      {movieDetail?.Response === "True" ? (
        <div className="content">
          <img
            className="poster"
            src={movieDetail.Poster}
            alt={movieDetail.Title}
          />
          <div className="info">
            <h1 className="title">{movieDetail.Title}</h1>
            <p className="year">{movieDetail.Year}</p>
            <p className="description">
              <strong>Duration:</strong> {movieDetail.Runtime}
            </p>
            <p className="description">
              <strong>Genre:</strong> {movieDetail.Genre}
            </p>
            <p className="description">
              <strong>Director:</strong> {movieDetail.Director}
            </p>
            <p className="description">
              <strong>Cast:</strong> {movieDetail.Actors}
            </p>
            <p className="description">
              <strong>IMDb Rating:</strong> {movieDetail.imdbRating}
            </p>
            <p className="description">
              <strong>Plot:</strong> {movieDetail.Plot}
            </p>
          </div>
        </div>
      ) : (
        <div className="error">An error occurred: {error}</div>
      )}
    </div>
  );
};

export default MovieDetailPage;
