import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Netflix from './pages/Netflix';
import Login from './pages/Login';
import Player from './pages/Player';
import TVShows from "./pages/TVShows";
import MoviePage from "./pages/Movies";
import UserListedMovies from "./pages/UserListedMovies";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Netflix />} />
        <Route path="/player" element={<Player/>} />
        <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/movies" element={<MoviePage />} />
        <Route exact path="/new" element={<Player />} />
        <Route exact path="/mylist" element={<UserListedMovies />} />
      </Routes>
    </BrowserRouter>
  );
}
