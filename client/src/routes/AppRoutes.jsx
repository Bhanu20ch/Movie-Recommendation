import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "../pages/MovieDetails";
import Home from "../pages/Home";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
