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
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
      }}
      style={{
        backgroundColor: "#1e1e1e",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        transform: "scale(1)",
        border: `3px solid ${borderColor}`,
      }}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        style={{
          width: "100%",
          height: "350px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "15px",
        }}
      />
      {status === "watched" && (
        <span
          style={{
            backgroundColor: "#2ecc71",
            padding: "5px 10px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
            display: "inline-block",
            marginBottom: "10px",
          }}
        >
          ✅ Watched
        </span>
      )}

      {status === "favorite" && (
        <span
          style={{
            backgroundColor: "#e74c3c",
            padding: "5px 10px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
            display: "inline-block",
            marginBottom: "10px",
          }}
        >
          ❤️ Favorite
        </span>
      )}

      {status === "watch_later" && (
        <span
          style={{
            backgroundColor: "#3498db",
            padding: "5px 10px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
            display: "inline-block",
            marginBottom: "10px",
          }}
        >
          📌 Watch Later
        </span>
      )}

      <h2 style={{ marginBottom: "10px" }}>{movie.title}</h2>
      <p
        style={{
          color: "#f1c40f",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        ⭐ {movie.averageRating?.toFixed(1) || "0.0"}
      </p>
      <p
        style={{
          marginBottom: "10px",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {movie.description}
      </p>

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
