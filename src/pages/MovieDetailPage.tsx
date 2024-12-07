import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetailAsync } from "../redux/movieDetailSlice";

const MovieDetailPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { imdbID } = useParams<{ imdbID: string }>();
  const navigate = useNavigate(); // Use this hook for navigation

  const { movieDetail, loading, error } = useSelector(
    (state: RootState) => state.movieDetail
  );

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovieDetailAsync(imdbID));
    }
  }, [dispatch, imdbID]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  // Handle back button click
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (movieDetail) {
    return (
      <div className="movie-detail">
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>
          &larr; Back
        </button>

        <div className="header">
          <h1 className="title">
            {movieDetail.Title} ({movieDetail.Year})
          </h1>
          <p className="year">{movieDetail.Year}</p>
        </div>

        <img
          className="poster"
          src={movieDetail.Poster}
          alt={movieDetail.Title}
        />

        <p className="description">
          <strong>Genre:</strong> {movieDetail.Genre}
        </p>
        <p className="description">
          <strong>Director:</strong> {movieDetail.Director}
        </p>
        <p className="description">
          <strong>Plot:</strong> {movieDetail.Plot}
        </p>
        {/* Add more details as needed */}
      </div>
    );
  }

  return <div>no movie</div>;
};

export default MovieDetailPage;
