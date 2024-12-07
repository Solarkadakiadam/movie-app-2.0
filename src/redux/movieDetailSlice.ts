import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieDetail } from "../api/omdb";
import { MovieDetail } from "../api/types";

interface MovieDetailState {
  movieDetail: MovieDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailState = {
  movieDetail: null,
  loading: false,
  error: null,
};

export const fetchMovieDetailAsync = createAsyncThunk(
  "movieDetail/fetchMovieDetail",
  async (imdbID: string, { rejectWithValue }) => {
    try {
      const data = await fetchMovieDetail(imdbID);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch movie detail");
    }
  }
);

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetailAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetailAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetail = action.payload;
      })
      .addCase(fetchMovieDetailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
