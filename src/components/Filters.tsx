import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setType } from "../redux/MoviesSlice";
import { RootState, AppDispatch } from "../redux/Store";
import YearInput from "./YearInput";
import SearchInput from "./SearchInput";

const Filters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { type, loading } = useSelector((state: RootState) => state.movies);

  const handleTypeChange = (type: string) => {
    dispatch(setType(type));
  };

  return (
    <div className="filter-container">
      <SearchInput />
      <div className="filter-container__year-type">
        <YearInput />
        <label>
          Type:
          <select
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
            disabled={loading}
          >
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Filters;
