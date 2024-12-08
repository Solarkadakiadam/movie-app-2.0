import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage, fetchMoviesAsync } from "../redux/MoviesSlice-";
import { AppDispatch, RootState } from "../redux/Store";

const Pagination: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, totalResults, searchQuery, year, type, loading } = useSelector(
    (state: RootState) => state.movies
  );

  const totalPages = totalResults === 0 ? 1 : Math.ceil(totalResults / 10);
  const hasNextPage = page < totalPages;

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    dispatch(fetchMoviesAsync({ searchQuery, page: newPage, year, type }));
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1 || loading}
      >
        Previous
      </button>
      <p>
        Page: {page} / {totalPages}
      </p>
      <button
        disabled={!hasNextPage || loading}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
