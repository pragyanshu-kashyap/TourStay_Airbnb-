import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-500 to-blue-900 relative overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-24 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-32 left-48 w-1 h-1 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-20 left-72 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-28 right-32 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-44 right-56 w-1 h-1 bg-white rounded-full opacity-70"></div>
        <div className="absolute top-24 right-80 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-36 left-1/2 w-1 h-1 bg-white rounded-full opacity-90"></div>
        <div className="absolute top-52 left-1/3 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-40 right-1/4 w-1 h-1 bg-white rounded-full opacity-60"></div>
      </div>

      {/* Shooting Stars */}
      <div className="absolute top-20 left-20 w-16 h-0.5 bg-gradient-to-r from-white to-transparent opacity-70 transform -rotate-12"></div>
      <div className="absolute top-36 right-36 w-12 h-0.5 bg-gradient-to-r from-white to-transparent opacity-60 transform rotate-45"></div>

      {/* Moon */}
      <div className="absolute top-12 right-16 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-80"></div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 text-white">
        <div className="text-lg font-medium">Your Logo</div>
        <div className="hidden md:flex space-x-8 text-sm">
          <a href="/" className="hover:opacity-80 transition-opacity">
            Home
          </a>
          <a href="#" className="hover:opacity-80 transition-opacity">
            About us
          </a>
          <a href="/listings" className="hover:opacity-80 transition-opacity">
            Service
          </a>
          <a href="#" className="hover:opacity-80 transition-opacity">
            Contact
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 pt-12">
        <h1 className="text-8xl md:text-9xl font-bold mb-4 tracking-wider">
          WELCOME
        </h1>
        <p className="text-lg opacity-90 mb-16 max-w-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>

        <div className="mb-20">
          <p className="text-lg mb-8">Do You Wanna Join Us?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors">
              Get Started Now
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Mountain Layers - Smooth and Natural */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Back mountain range - lightest */}
        <div className="absolute bottom-0 w-full h-80">
          <svg
            viewBox="0 0 1200 320"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,320 L0,200 C200,180 400,160 600,180 C800,200 1000,160 1200,180 L1200,320 Z"
              fill="#3b82f6"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Middle mountain range */}
        <div className="absolute bottom-0 w-full h-72">
          <svg
            viewBox="0 0 1200 288"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,288 L0,160 C150,140 300,120 450,140 C600,160 750,120 900,140 C1050,160 1125,140 1200,150 L1200,288 Z"
              fill="#2563eb"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* Front mountain range - darkest */}
        <div className="absolute bottom-0 w-full h-64">
          <svg
            viewBox="0 0 1200 256"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,256 L0,120 C200,100 400,80 600,100 C800,120 1000,80 1200,100 L1200,256 Z"
              fill="#1e40af"
              opacity="0.9"
            />
          </svg>
        </div>

        {/* Foreground silhouette */}
        <div className="absolute bottom-0 w-full h-48">
          <svg
            viewBox="0 0 1200 192"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,192 L0,80 C300,60 600,40 900,60 C1050,70 1125,65 1200,70 L1200,192 Z"
              fill="#0f172a"
            />
          </svg>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs opacity-70 z-10">
        designed by ❤️ freepik
      </div>
    </div>
  );
}
