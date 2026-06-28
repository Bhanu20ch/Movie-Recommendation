import axios from "axios";

const API_URL = "http://localhost:5000/api/movies";

export const getMovies = async (page = 1, limit = 20) => {
  const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);

  return response.data;
};
