import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { setYear } from "../redux/moviesSlice";
import { AppDispatch, RootState } from "../redux/store";

const YearInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery, page, year, type, loading } = useSelector(
    (state: RootState) => state.movies
  );

  const [yearInput, setYearInput] = useState(year);

  const debouncedYearChange = useCallback(
    debounce((year: string) => {
      dispatch(setYear(year));
    }, 500),
    [dispatch, searchQuery, page, type]
  );

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = e.target.value;
    setYearInput(year);
    debouncedYearChange(year); // Call debounced year
  };

  return (
    <label>
      Year:
      <input
        type="number"
        value={yearInput}
        onChange={handleYearChange}
        disabled={loading}
      />
    </label>
  );
};

export default YearInput;
