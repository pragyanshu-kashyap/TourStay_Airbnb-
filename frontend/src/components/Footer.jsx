import React from "react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative w-full bg-gradient-to-r from-blue-500 via-teal-400 to-orange-300 text-white pt-12 pb-6 mt-auto overflow-hidden"
    >
      {/* SVG Wave Accent */}
      <div className="absolute top-0 left-0 w-full -translate-y-full pointer-events-none select-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-20"
        >
          <path
            fill="#fff"
            fillOpacity="0.18"
            d="M0,64L60,74.7C120,85,240,107,360,101.3C480,96,600,64,720,37.3C840,11,960,-11,1080,5.3C1200,21,1320,75,1380,101.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-white text-sm font-inter relative z-10">
        <div className="mb-4 md:mb-0 flex flex-col items-center md:items-start">
          <span className="font-extrabold text-2xl font-poppins tracking-tight flex items-center gap-2">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
              />
            </svg>
            PlanMyTour
          </span>
          <span className="mt-2 text-white/80">
            &copy; {new Date().getFullYear()} PlanMyTour. All rights reserved.
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4 md:mb-0">
          <a
            href="/privacy"
            className="hover:text-orange-100 transition-colors"
          >
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-orange-100 transition-colors">
            Terms of Service
          </a>
          <a
            href="#contact"
            className="hover:text-orange-100 transition-colors"
          >
            Contact
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="mailto:info@planmytour.com"
            className="hover:text-orange-100 transition-colors flex items-center gap-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm2 8H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2z"
              />
            </svg>
            info@planmytour.com
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-orange-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.39 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254A4.904 4.904 0 01.964 10.1v.062a4.926 4.926 0 003.946 4.827c-.417.113-.855.171-1.309.171-.32 0-.634-.03-.94-.086.635 1.977 2.476 3.415 4.656 3.455A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-orange-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.402 3.635 1.37 2.668 2.337 2.396 3.51 2.338 4.788 2.279 6.068 2.267 6.477 2.267 12c0 5.523.012 5.932.071 7.212.058 1.278.33 2.451 1.297 3.418.967.967 2.14 1.239 3.418 1.297C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.278-.058 2.451-.33 3.418-1.297.967-.967 1.239-2.14 1.297-3.418.059-1.28.071-1.689.071-7.212 0-5.523-.012-5.932-.071-7.212-.058-1.278-.33-2.451-1.297-3.418C19.399.402 18.226.13 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
