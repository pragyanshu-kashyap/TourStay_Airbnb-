import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listings/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch listing");
        }
        const data = await response.json();
        setListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Listing Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "The listing you're looking for doesn't exist."}
          </p>
          <Link
            to="/listings"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/listings"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Listings
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image Section */}
          <div className="relative h-96 md:h-[500px] overflow-hidden">
            <img
              src={
                listing.image ||
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
              }
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-poppins">
                  {listing.title}
                </h1>

                <div className="flex items-center text-gray-600 mb-6">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-lg">{listing.location}</span>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                  <p className="text-lg leading-relaxed">
                    {listing.description}
                  </p>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Property Details
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">
                          {listing.category || "Vacation Rental"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span className="font-medium">
                          {listing.guests || "Up to 4"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bedrooms:</span>
                        <span className="font-medium">
                          {listing.bedrooms || "2"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bathrooms:</span>
                        <span className="font-medium">
                          {listing.bathrooms || "1"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Amenities
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-gray-600">
                      <div className="flex items-center">
                        <span className="mr-2">✓</span>
                        <span>WiFi</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">✓</span>
                        <span>Kitchen</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">✓</span>
                        <span>Parking</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">✓</span>
                        <span>Air Conditioning</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-6 rounded-xl text-white">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold mb-2">
                      ₹{listing.price}
                    </div>
                    <div className="text-blue-100">per night</div>
                  </div>

                  <button className="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors mb-4">
                    Book Now
                  </button>

                  <button className="w-full border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                    Contact Host
                  </button>

                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-between text-sm">
                      <span>Availability</span>
                      <span className="font-medium">Check Calendar</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span>Cancellation</span>
                      <span className="font-medium">Flexible</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
