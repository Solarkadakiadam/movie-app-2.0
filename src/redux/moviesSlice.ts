import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovies } from "../api/omdb";

// Define the types for Movie and MoviesState
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

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

// Initial state
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

// Async thunk for fetching movies
export const fetchMoviesAsync = createAsyncThunk(
  "movies/fetchMovies",
  async (params: {
    searchQuery: string;
    page: number;
    year: string;
    type: string;
  }) => {
    const { searchQuery, page, year, type } = params;

    const response = await fetchMovies(searchQuery, page, year, type);
    await new Promise((resolve) => setTimeout(resolve, 4000));
    return response.data;
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
    // Handling movies fetching
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
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export const { setSearchQuery, setPage, setYear, setType } =
  moviesSlice.actions;

export default moviesSlice.reducer;
