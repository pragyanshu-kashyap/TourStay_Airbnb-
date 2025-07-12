import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/40 to-teal-700/30" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-32 w-full">
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg font-poppins mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Plan Your Dream Trip with Ease!
        </motion.h1>
        <motion.p
          className="text-lg sm:text-2xl text-white/90 mb-8 max-w-2xl font-inter"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Discover breathtaking destinations, unique stays, and unforgettable
          adventures. Start your journey with PlanMyTour today.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          onClick={() =>
            (window.location.href = "http://localhost:8080/listings")
          }
          className="px-10 py-4 bg-gradient-to-r from-orange-400 via-teal-400 to-blue-500 text-white text-lg font-bold rounded-full shadow-xl hover:from-orange-500 hover:to-blue-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200 animate-bounce-in"
        >
          Explore Now
        </motion.button>
      </div>
      {/* Decorative overlay for soft shadow */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent" />
    </section>
  );
}
