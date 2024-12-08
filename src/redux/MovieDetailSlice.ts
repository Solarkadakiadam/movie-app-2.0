import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovieDetail } from "../api/omdb";
import { MovieDetail } from "../types/types";

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

export const fetchMovieDetailAsync = createAsyncThunk<
  MovieDetail,
  string,
  { rejectValue: string }
>("movieDetail/fetchMovieDetail", async (imdbID, { rejectWithValue }) => {
  try {
    const data = await fetchMovieDetail(imdbID);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch movie detail");
  }
});

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
      .addCase(
        fetchMovieDetailAsync.fulfilled,
        (state, action: PayloadAction<MovieDetail>) => {
          state.loading = false;
          state.movieDetail = action.payload;
        }
      )
      .addCase(
        fetchMovieDetailAsync.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Unknown error";
        }
      );
  },
});

export default movieDetailSlice.reducer;
