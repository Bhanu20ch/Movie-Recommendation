import { useEffect, useState } from "react";

import axios from "axios";

import MovieCard from "../components/MovieCard";

import Navbar from "../components/Navbar";

import { getMovies } from "../services/movieService";

import { useUser } from "@clerk/clerk-react";

function Home() {
  const [movies, setMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusMap, setStatusMap] = useState({});
  const { user } = useUser();

  useEffect(() => {
    fetchMovies();
  }, [user]);

  const fetchMovies = async () => {
    try {
      const data = await getMovies();

      setMovies(data);

      if (user) {
        const statusResponse = await axios.get(
          `http://localhost:5000/api/status/user/${user.id}`,
        );

        const map = {};

        statusResponse.data.forEach((item) => {
          map[item.movieId] = item.status;
        });

        setStatusMap(map);
      }
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
            color: "#f5c518",
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
            <MovieCard
              key={movie._id}
              movie={movie}
              status={statusMap[movie._id]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
