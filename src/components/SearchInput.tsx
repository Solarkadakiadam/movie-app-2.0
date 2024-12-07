import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { setSearchQuery } from "../redux/moviesSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";

const SearchInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery, page, year, type, loading } = useSelector(
    (state: RootState) => state.movies
  );

  const [searchInput, setSearchInput] = useState(searchQuery);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(setSearchQuery(query));
    }, 500),
    [dispatch, page, year, type]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchInput(query);
    debouncedSearch(query); // Call debounced search
  };

  return (
    <label>
      Search:
      <input
        type="text"
        placeholder="Search movies"
        value={searchInput}
        onChange={handleSearchChange}
        disabled={loading}
      />
    </label>
  );
};

export default SearchInput;
