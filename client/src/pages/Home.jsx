import { useEffect, useState } from "react";

import axios from "axios";

import MovieCard from "../components/MovieCard";

import Navbar from "../components/Navbar";

import { getMovies } from "../services/movieService";

import { useUser } from "@clerk/clerk-react";

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [statusMap, setStatusMap] = useState({});
  const { user } = useUser();

  useEffect(() => {
    if (isSearching) {
      handleSearch();
    } else {
      fetchMovies();
    }
  }, [user, page]);

  const fetchMovies = async () => {
    try {
      const data = await getMovies(page, 20);

      setMovies(data.movies);
      setTotalPages(data.totalPages);

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
      if (
        searchQuery.trim() === "" &&
        selectedGenre === "" &&
        selectedLanguage === ""
      ) {
        setIsSearching(false);
        fetchMovies();
        return;
      }
      setIsSearching(true);
      const response = await axios.get(
        "http://localhost:5000/api/movies/search",
        {
          params: {
            title: searchQuery,
            genre: selectedGenre,
            language: selectedLanguage,
            page,
            limit: 20,
          },
        },
      );

      setMovies(response.data.movies);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            style={{
              padding: "10px 20px",
              cursor: page === 1 ? "not-allowed" : "pointer",
              opacity: page === 1 ? 0.5 : 1,
              fontSize: "16px",
            }}
          >
            Previous
          </button>

          <span
            style={{
              color: "white",
              fontSize: "18px",
            }}
          >
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
            style={{
              padding: "10px 20px",
              cursor: page >= totalPages ? "not-allowed" : "pointer",
              opacity: page >= totalPages ? 0.5 : 1,
              fontSize: "16px",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
