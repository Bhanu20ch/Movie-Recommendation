function Navbar() {
  return (
    <nav
      style={{
        padding: "20px",
        backgroundColor: "#111",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>MSR</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <p>Home</p>
        <p>Movies</p>
        <p>Login</p>
      </div>
    </nav>
  );
}

export default Navbar;
