import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "../pages/MovieDetails";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
