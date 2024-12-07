import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieDetail, MovieDetail } from "../api/omdb";

interface MovieDetailState {
  movieDetail: MovieDetail | null; // Add movieDetail to hold movie detail data
  loading: boolean;
  error: string | null;
}

// Initial state including movieDetail
const initialState: MovieDetailState = {
  movieDetail: null,
  loading: false,
  error: null,
};

// Async thunk for fetching movie details
export const fetchMovieDetailAsync = createAsyncThunk(
  "movieDetail/fetchMovieDetail",
  async (imdbID: string) => {
    const response = await fetchMovieDetail(imdbID);
    return response.data;
  }
);

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling movies fetching
    builder
      // Handling movie detail fetching
      .addCase(fetchMovieDetailAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetailAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetail = action.payload; // Set the movie detail to the state
      })
      .addCase(fetchMovieDetailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movie detail";
      });
  },
});

export const {} = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
