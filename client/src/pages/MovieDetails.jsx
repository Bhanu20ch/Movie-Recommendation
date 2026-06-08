import { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function MovieDetails() {
  const { id } = useParams();
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [movieStatus, setMovieStatus] = useState("");

  useEffect(() => {
    fetchMovie();
  }, [user, id]);

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

      if (user) {
        console.log("USER:", user.id);

        const statusResponse = await axios.get(
          `http://localhost:5000/api/status/${user.id}/${id}`,
        );

        console.log("STATUS RESPONSE:", statusResponse.data);

        if (statusResponse.data) {
          setMovieStatus(statusResponse.data.status);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitReview = async () => {
    console.log("Submit button clicked");

    if (!user) {
      setMessage("⚠️ Please login first");

      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    try {
      const payload = {
        movie: id,
        userId: user.id,
        username:
          user.fullName ||
          user.firstName ||
          user.primaryEmailAddress?.emailAddress ||
          "User",
        rating: Number(rating),
        comment,
      };

      console.log(payload);

      const response = await axios.post(
        "http://localhost:5000/api/reviews",
        payload,
      );

      console.log(response.data);

      setMessage("✅ Review Saved Successfully");

      setTimeout(() => {
        setMessage("");
      }, 2000);

      setRating("");
      setComment("");

      fetchMovie();
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }

      setMessage("❌ Review Failed");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };
  const updateStatus = async (status) => {
    if (!user) {
      setMessage("⚠️ Please login first");

      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/status", {
        userId: user.id,
        movieId: id,
        status,
      });

      setMovieStatus(status);

      setMessage(`✅ Movie marked as ${status}`);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  if (!movie) {
    return (
      <h1
        style={{
          color: "white",
          background: "linear-gradient(to bottom, #0f0f0f, #1a1a1a)",
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
        background: "linear-gradient(to bottom, #0f0f0f, #1a1a1a)",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >
      {message && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
            backgroundColor:
              message.includes("Failed") || message.includes("login")
                ? "#e74c3c"
                : "#2ecc71",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          }}
        >
          {message}
        </div>
      )}
      <img
        src={movie.poster}
        alt={movie.title}
        style={{
          width: "350px",
          boxShadow: "0 0 25px rgba(245,197,24,0.3)",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      />

      <h1
        style={{
          color: "#f5c518",
          marginBottom: "10px",
        }}
      >
        {movie.title}
      </h1>
      <div
        style={{
          backgroundColor: "#232323",
          border: "1px solid #f5c518",
          boxShadow: "0 0 15px rgba(245,197,24,0.2)",
          padding: "15px",
          borderRadius: "10px",
          marginTop: "15px",
          marginBottom: "20px",
          width: "250px",
        }}
      >
        <h3>Overall Rating</h3>

        <p
          style={{
            color: "#f1c40f",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          ⭐ {movie.averageRating?.toFixed(1) || "0.0"} / 5
        </p>

        <p>{reviews.length} Reviews</p>
      </div>
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
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "25px",
        }}
      >
        <div
          onClick={() => updateStatus("watched")}
          style={{
            backgroundColor: movieStatus === "watched" ? "#2ecc71" : "#555",
            boxShadow: movieStatus === "watched" ? "0 0 15px #2ecc71" : "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            color: "white",
            transition: "0.3s",
          }}
        >
          ✅ Watched
        </div>

        <div
          onClick={() => updateStatus("favorite")}
          style={{
            backgroundColor: movieStatus === "favorite" ? "#e74c3c" : "#555",
            boxShadow: movieStatus === "favorite" ? "0 0 15px #e74c3c" : "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            color: "white",
            transition: "0.3s",
          }}
        >
          ❤️ Favorite
        </div>

        <div
          onClick={() => updateStatus("watch_later")}
          style={{
            backgroundColor: movieStatus === "watch_later" ? "#3498db" : "#555",
            boxShadow:
              movieStatus === "watch_later" ? "0 0 15px #3498db" : "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            color: "white",
            transition: "0.3s",
          }}
        >
          📌 Watch Later
        </div>
      </div>
      <div
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          backgroundColor: "#232323",
          border: "1px solid #333",
          boxShadow: "0 0 15px rgba(245,197,24,0.1)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ color: "#f5c518" }}>Add Review</h2>

        <input
          type="number"
          step="0.1"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            borderRadius: "5px",
            border: "none",
          }}
        />

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            borderRadius: "5px",
            border: "none",
            minHeight: "100px",
          }}
        />

        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            submitReview();
          }}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#f5c518",
            color: "#121212",
            fontWeight: "bold",
            width: "180px",
            textAlign: "center",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Review
        </div>
      </div>
      <h2 style={{ color: "#f5c518" }}>Reviews</h2>
      <div style={{ marginTop: "20px" }}>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              style={{
                backgroundColor: "#232323",
                border: "1px solid #333",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            >
              <h3 style={{ color: "#f5c518" }}>👤 {review.username}</h3>

              <p
                style={{
                  color: "#f5c518",
                  fontWeight: "bold",
                }}
              >
                ⭐ {review.rating}/5
              </p>

              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
