import { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function MovieDetails() {
  const { id } = useParams();
  const { user } = useUser();

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
      alert("Please login first");
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

      alert("Review Added Successfully");

      setRating("");
      setComment("");

      fetchMovie();
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Review Failed");
    }
  };
  const updateStatus = async (status) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/status", {
        userId: user.id,
        movieId: id,
        status,
      });

      setMovieStatus(status);

      alert(`Movie marked as ${status}`);
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
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            color: "white",
          }}
        >
          ✅ Watched
        </div>

        <div
          onClick={() => updateStatus("favorite")}
          style={{
            backgroundColor: movieStatus === "favorite" ? "#e74c3c" : "#555",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            color: "white",
          }}
        >
          ❤️ Favorite
        </div>

        <div
          onClick={() => updateStatus("watch_later")}
          style={{
            backgroundColor: movieStatus === "watch_later" ? "#3498db" : "#555",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            color: "white",
          }}
        >
          📌 Watch Later
        </div>
      </div>
      <div
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          backgroundColor: "#1e1e1e",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>Add Review</h2>

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
            backgroundColor: "white",
            color: "black",
            width: "180px",
            textAlign: "center",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Review
        </div>
      </div>
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
