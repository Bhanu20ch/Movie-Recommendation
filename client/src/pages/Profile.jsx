import { useUser } from "@clerk/clerk-react";

function Profile() {
  const { user } = useUser();

  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>My Movies</h1>

      <p>Welcome, {user?.fullName || user?.firstName}</p>

      <h2>❤️ Favorites</h2>

      <h2 style={{ marginTop: "30px" }}>✅ Watched</h2>

      <h2 style={{ marginTop: "30px" }}>📌 Watch Later</h2>
    </div>
  );
}

export default Profile;
