import { useEffect, useState } from "react";
import heroImage from "../assets/image.png";
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
  const [totalPages, setTotalPages] = useState(1);
  const [statusMap, setStatusMap] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  const { user } = useUser();

  const kenBurnsStyle = `
    @keyframes kenburns {
      0% { transform: scale(1) translate(0px, 0px); }
      100% { transform: scale(1.1) translate(-25px, 10px); }
    }
  `;

  useEffect(() => {
    if (searchQuery || selectedGenre || selectedLanguage) {
      handleSearch();
    } else {
      fetchMovies();
    }
  }, [user, page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

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
      <style>{kenBurnsStyle}</style>

      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        handleSearch={handleSearch}
      />

      {/* ✅ GLOBAL BACKGROUND WRAPPER (OPTION 3) */}
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          position: "relative",
        }}
      >
        {/* DARK OVERLAY FOR READABILITY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.6), rgba(0,0,0,0.9))",
            zIndex: 1,
          }}
        />

        {/* CONTENT */}
        <div style={{ position: "relative", zIndex: 2 }}>
          {/* HERO */}
          <div
            style={{
              height: "70vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "white",
              padding: "0 20px",
            }}
          >
            <h1 style={{ fontSize: "52px", marginBottom: "15px" }}>
              Discover Your Next Favorite Movie
            </h1>
            <p style={{ fontSize: "20px", color: "#ddd" }}>
              Explore 43,000+ Movies • Rate • Review • Watchlist
            </p>
          </div>

          {/* MOVIES SECTION */}
          <div style={{ padding: "20px" }}>
            <h1 style={{ color: "#f5c518", marginBottom: "20px" }}>Movies</h1>

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

            {/* PAGINATION */}
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
                }}
              >
                Previous
              </button>

              <span style={{ color: "white" }}>
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                style={{
                  padding: "10px 20px",
                  cursor: page >= totalPages ? "not-allowed" : "pointer",
                  opacity: page >= totalPages ? 0.5 : 1,
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
