import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import movieDetailReducer from "./movieDetailSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetail: movieDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // RootState type
export type AppDispatch = typeof store.dispatch; // AppDispatch type

export default store;
