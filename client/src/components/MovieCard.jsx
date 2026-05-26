import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie._id}`);
  };

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
      }}
    >
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
