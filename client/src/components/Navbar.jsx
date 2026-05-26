import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

function Navbar({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <nav
      style={{
        padding: "20px",
        backgroundColor: "#111",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
      }}
    >
      <h2>MSR</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            width: "250px",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "10px 15px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <SignedOut>
          <SignInButton />

          <SignUpButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;
