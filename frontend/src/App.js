import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/homepage/homepage";
import Listings from "./pages/listings/listings";
import Profile from "./pages/profile/profile";

import Navbar from "./pages/navbar/navbar";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="app-body">
        <Router>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="ucla-listings" element={<Listings />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
