import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

// Features/Services Section
function Features() {
  const features = [
    {
      icon: (
        <svg
          className="w-12 h-12 text-blue-500 transition-transform duration-300"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      title: "Discover Destinations",
      desc: "Explore mountains, beaches, and cities worldwide.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-orange-400 transition-transform duration-300"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V6a4 4 0 00-8 0v4m12 0a4 4 0 01-8 0m8 0v4a4 4 0 01-8 0v-4"
          />
        </svg>
      ),
      title: "Secure Bookings",
      desc: "Book with confidence and secure payment options.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-teal-400 transition-transform duration-300"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 0C7.582 4 4 7.582 4 12c0 4.418 3.582 8 8 8s8-3.582 8-8c0-4.418-3.582-8-8-8z"
          />
        </svg>
      ),
      title: "Expert Guides",
      desc: "Connect with local experts for unique experiences.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-pink-400 transition-transform duration-300"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 22s8-4.5 8-10V7a4 4 0 00-8-3 4 4 0 00-8 3v5c0 5.5 8 10 8 10z"
          />
        </svg>
      ),
      title: "24/7 Support",
      desc: "We’re here for you, anytime, anywhere.",
    },
  ];
  return (
    <section
      id="features"
      className="relative py-20 bg-gradient-to-b from-white to-blue-50 overflow-hidden"
    >
      {/* SVG Wave Background Accent */}
      <div className="absolute top-0 left-0 w-full h-32 pointer-events-none select-none z-0">
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            fill="#38bdf8"
            fillOpacity="0.12"
            d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-2 text-blue-900 font-poppins"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Our Services
        </motion.h2>
        <motion.p
          className="text-lg text-center text-blue-700 mb-12 font-inter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Everything you need for your next adventure.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              tabIndex={0}
              className="group bg-white rounded-2xl p-8 flex flex-col items-center shadow-xl border-t-4 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
              style={{
                borderTopColor: ["#3b82f6", "#fb923c", "#2dd4bf", "#f472b6"][i],
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{
                y: -8,
                scale: 1.07,
                boxShadow: "0 8px 32px 0 rgba(56,189,248,0.15)",
              }}
              whileFocus={{
                y: -8,
                scale: 1.07,
                boxShadow: "0 8px 32px 0 rgba(56,189,248,0.15)",
              }}
            >
              <motion.div
                className="mb-4"
                whileHover={{
                  scale: 1.2,
                  rotate: 8,
                  filter: "drop-shadow(0 0 8px #38bdf8)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {f.icon}
              </motion.div>
              <h3 className="mt-2 text-xl font-semibold text-blue-900 mb-2 text-center font-poppins">
                {f.title}
              </h3>
              <p className="text-gray-600 text-center font-inter">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function Testimonials() {
  const testimonials = [
    {
      name: "Priya S.",
      text: "PlanMyTour made my vacation planning so easy! The host was wonderful and the place was exactly as described.",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Rahul M.",
      text: "I loved the variety of unique homes. Booking was seamless and support was always available.",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Aisha K.",
      text: "The best travel experience I've had! Highly recommend PlanMyTour to everyone.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Lucas T.",
      text: "The expert guides made my trip unforgettable. Will use PlanMyTour again!",
      img: "https://randomuser.me/api/portraits/men/65.jpg",
    },
  ];
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-2 text-blue-900 font-poppins"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          What Our Travelers Say
        </motion.h2>
        <motion.p
          className="text-lg text-center text-blue-700 mb-12 font-inter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Real stories from real adventurers.
        </motion.p>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-xl border-l-4 border-blue-200 hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <img
                src={t.img}
                alt={t.name}
                className="w-20 h-20 rounded-full mb-4 border-4 border-teal-200 shadow-md"
              />
              <p className="text-gray-700 italic mb-4 text-center font-inter">
                “{t.text}”
              </p>
              <span className="font-semibold text-teal-600 font-poppins">
                {t.name}
              </span>
            </motion.div>
          ))}
        </div>
        {/* Carousel for mobile */}
        <div className="md:hidden flex flex-col items-center">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-xl border-l-4 border-blue-200 mb-6 w-full max-w-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <img
                src={t.img}
                alt={t.name}
                className="w-20 h-20 rounded-full mb-4 border-4 border-teal-200 shadow-md"
              />
              <p className="text-gray-700 italic mb-4 text-center font-inter">
                “{t.text}”
              </p>
              <span className="font-semibold text-teal-600 font-poppins">
                {t.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Newsletter Signup Section
function NewsletterSignup() {
  return (
    <section className="py-16 bg-teal-50" data-aos="fade-up">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 animate-fade-in-up">
          Stay in the Loop!
        </h2>
        <p className="mb-6 text-gray-700">
          Subscribe to get the latest updates, travel tips, and exclusive offers
          from StayEase.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="px-4 py-3 rounded-full border border-teal-300 focus:ring-2 focus:ring-teal-400 outline-none w-full sm:w-auto"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-full shadow hover:bg-teal-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      <HeroSection />
      <Features />
      <Testimonials />
      <NewsletterSignup />
    </>
  );
}
