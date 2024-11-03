import axios from 'axios';

const API_KEY = '0a9f7e226d56b50c0105cbdeef5bf44d';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR', // para conteúdo em português
  },
});

export const getUpcomingMovies = () => api.get('/movie/upcoming');
export const getNowPlayingMovies = () => api.get('/movie/now_playing');
export const getMovieDetails = (movieId) => api.get(`/movie/${movieId}`);
export const searchMovies = (query) => api.get('/search/movie', { params: { query } });

export default api;
