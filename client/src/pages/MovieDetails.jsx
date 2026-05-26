import { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/movies/${id}`,
      );

      setMovie(response.data);
      const reviewResponse = await axios.get(
        `http://localhost:5000/api/reviews/${id}`,
      );

      setReviews(reviewResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!movie) {
    return (
      <h1
        style={{
          color: "white",
          backgroundColor: "#121212",
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        Loading...
      </h1>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        style={{
          width: "300px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      />

      <h1>{movie.title}</h1>

      <p style={{ marginTop: "15px" }}>{movie.description}</p>

      <p style={{ marginTop: "15px" }}>
        <strong>Director:</strong> {movie.director}
      </p>

      <p style={{ marginTop: "15px" }}>
        <strong>Language:</strong> {movie.language}
      </p>

      <p style={{ marginTop: "15px" }}>
        <strong>Genres:</strong> {movie.genres.join(", ")}
      </p>

      <p style={{ marginTop: "15px" }}>
        <strong>Cast:</strong> {movie.cast.join(", ")}
      </p>

      <h2>Reviews</h2>
      <div style={{ marginTop: "20px" }}>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              style={{
                backgroundColor: "#1e1e1e",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            >
              <h3>{review.username}</h3>

              <p>⭐ {review.rating}/5</p>

              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
