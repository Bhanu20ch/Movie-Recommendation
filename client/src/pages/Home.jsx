import { useEffect, useState } from "react";

import axios from "axios";

import MovieCard from "../components/MovieCard";

import Navbar from "../components/Navbar";

import { getMovies } from "../services/movieService";

function Home() {
  const [movies, setMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await getMovies();

      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() === "") {
        fetchMovies();

        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/movies/search?q=${searchQuery}`,
      );

      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      <div
        style={{
          padding: "20px",
          backgroundColor: "#121212",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            color: "white",
            marginBottom: "20px",
          }}
        >
          Movies
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
