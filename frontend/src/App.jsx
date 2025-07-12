import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./components/LandingPage.jsx";
import AllListings from "./components/AllListings.jsx";
import ListingDetail from "./components/ListingDetail.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

function Services() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-gray-800 font-inter">
      <h2 className="text-4xl font-bold mb-4 text-teal-600">Our Services</h2>
      <p className="max-w-xl text-center text-lg">
        Explore our curated selection of vacation rentals, unique stays, and
        travel experiences designed to make your next trip unforgettable.
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-poppins bg-white">
        <Navbar />
        <div className="pt-16 flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/listings" element={<AllListings />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            {/* Add About and Contact routes as needed */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
