import axios, { AxiosResponse } from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "http://www.omdbapi.com/";

const omdbApi = axios.create({
  baseURL: BASE_URL,
});

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface ApiResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetail {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export const fetchMovieDetail = (
  imdbID: string
): Promise<AxiosResponse<MovieDetail>> => {
  return omdbApi.get<MovieDetail>("/", {
    params: {
      i: imdbID,
      r: "json",
      apiKey: API_KEY,
    },
  });
};

export const fetchMovies = (
  searchQuery: string = "pokemon",
  page: number = 1,
  year: string = "",
  type: string = "movie"
): Promise<AxiosResponse<ApiResponse>> => {
  return omdbApi.get<ApiResponse>("/", {
    params: {
      s: searchQuery,
      page,
      y: year,
      type,
      r: "json",
      apiKey: API_KEY,
    },
  });
};
