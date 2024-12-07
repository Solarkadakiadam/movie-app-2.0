import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovies } from "../api/omdb";
import { Movie } from "../api/types";

interface MoviesState {
  movies: Movie[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  page: number;
  year: string;
  type: string;
  totalResults: number;
}

const initialState: MoviesState = {
  movies: [],
  searchQuery: "pokemon",
  loading: false,
  error: null,
  page: 1,
  year: "",
  type: "movie",
  totalResults: 0,
};

export const fetchMoviesAsync = createAsyncThunk(
  "movies/fetchMovies",
  async (params: {
    searchQuery: string;
    page: number;
    year: string;
    type: string;
  }) => {
    const { searchQuery, page, year, type } = params;
    try {
      const response = await fetchMovies(searchQuery, page, year, type);
      return response;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch movies");
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search;
        state.totalResults = parseInt(action.payload.totalResults, 10);
      })
      .addCase(fetchMoviesAsync.rejected, (state, action) => {
        state.loading = false;
        state.movies = [];
        state.totalResults = 0;
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export const { setSearchQuery, setPage, setYear, setType } =
  moviesSlice.actions;

export default moviesSlice.reducer;
