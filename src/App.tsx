import React from "react";
import { Routes, Route } from "react-router-dom";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailPage from "./pages/MovieDetailPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieListPage />} />
      <Route path="/movie/:imdbID" element={<MovieDetailPage />} />
    </Routes>
  );
};

export default App;
