import axios from "axios";
import { ApiResponse, MovieDetail } from "../types/types";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "http://www.omdbapi.com/";

const omdbApi = axios.create({
  baseURL: BASE_URL,
});

export const fetchMovieDetail = async (
  imdbID: string
): Promise<MovieDetail> => {
  try {
    const response = await omdbApi.get<
      MovieDetail & { Response: string; Error?: string }
    >("/", {
      params: {
        i: imdbID,
        r: "json",
        apiKey: API_KEY,
      },
    });

    if (response.data.Response === "False") {
      throw new Error(response.data.Error || "Unknown error occurred");
    }

    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch movie detail:", error);
    throw new Error(
      error.response?.data?.Error ||
        error.message ||
        "Failed to fetch movie detail"
    );
  }
};

export const fetchMovies = async (
  searchQuery: string = "pokemon",
  page: number = 1,
  year: string = "",
  type: string = "movie"
): Promise<ApiResponse> => {
  try {
    const response = await omdbApi.get<
      ApiResponse & { Response: string; Error?: string }
    >("/", {
      params: {
        s: searchQuery,
        page,
        y: year,
        type,
        r: "json",
        apiKey: API_KEY,
      },
    });

    if (response.data.Response === "False") {
      throw new Error(response.data.Error || "Unknown error occurred");
    }

    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch movies:", error);
    throw new Error(
      error.response?.data?.Error || error.message || "Failed to fetch movies"
    );
  }
};
