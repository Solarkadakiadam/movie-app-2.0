import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./MoviesSlice";
import movieDetailReducer from "./MovieDetailSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetail: movieDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
