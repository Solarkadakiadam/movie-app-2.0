import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage, fetchMoviesAsync } from "../redux/moviesSlice";
import { AppDispatch, RootState } from "../redux/store";

const Pagination: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, totalResults, searchQuery, year, type, loading } = useSelector(
    (state: RootState) => state.movies
  );


  const hasNextPage = page * 10 < totalResults;

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
      <p>Page: {page}</p>
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
