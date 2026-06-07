import { useNavigate } from "react-router-dom";

function MovieCard({ movie, status }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie._id}`);
  };

  const borderColor =
    status === "watched"
      ? "#2ecc71"
      : status === "favorite"
        ? "#e74c3c"
        : status === "watch_later"
          ? "#3498db"
          : "#1e1e1e";

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: "#1e1e1e",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        cursor: "pointer",
        transition: "0.3s",
        border: `3px solid ${borderColor}`,
      }}
    >
      {status === "watched" && (
        <p
          style={{
            color: "#2ecc71",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          ✅ Watched
        </p>
      )}

      {status === "favorite" && (
        <p
          style={{
            color: "#e74c3c",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          ❤️ Favorite
        </p>
      )}

      {status === "watch_later" && (
        <p
          style={{
            color: "#3498db",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          📌 Watch Later
        </p>
      )}

      <h2 style={{ marginBottom: "10px" }}>{movie.title}</h2>

      <p style={{ marginBottom: "10px" }}>{movie.description}</p>

      <p>
        <strong>Director:</strong> {movie.director}
      </p>

      <p>
        <strong>Language:</strong> {movie.language}
      </p>

      <p>
        <strong>Genres:</strong> {movie.genres.join(", ")}
      </p>
    </div>
  );
}

export default MovieCard;
