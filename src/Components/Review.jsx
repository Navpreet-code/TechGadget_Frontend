import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    message: "",
  });

  // ✅ Fetch reviews - only top 3 (based on latest or best rating)
  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/Reviews/GetReviews");
      if (res.data.success && res.data.reviews.length > 0) {
        // 🔹 Sort reviews: highest rating first, then latest
        const sorted = res.data.reviews
          .sort((a, b) => {
            if (b.rating === a.rating) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return b.rating - a.rating;
          })
          .slice(0, 3); // 🔹 Only top 3
        setReviews(sorted);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.rating || !formData.message) {
      toast.warning("⚠️ Please fill all fields before submitting!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/Reviews/AddReview", formData);
      if (res.data.success) {
        toast.success("✅ Review added successfully!");
        setFormData({ name: "", rating: "", message: "" });

        // 🔹 Don’t update visible cards — just refresh backend data silently
        fetchReviews();
      } else {
        toast.error("❌ Failed to add review!");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" autoClose={2500} />

      {/* Banner Section */}
      <section className="banner relative flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100">
        <div className="banner-content text-center py-16">
          <h1 className="head text-3xl font-bold text-indigo-800 mb-2">
            Customer Reviews
          </h1>
          <p className="subhead text-gray-700">
            <a href="#" className="opacity-80 hover:opacity-100 cursor-pointer">
              Home
            </a>
            <span className="mx-3">&gt;</span>
            <span className="font-medium text-indigo-700">Review</span>
          </p>
        </div>
      </section>

      {/* Review Section */}
      <section className="bg-[#eef2f7] py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-700 mb-2">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">
              We truly value every piece of feedback from our community 💬
            </p>
          </div>

          {/* Review Cards */}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-black"
                >
                  <h3 className="text-lg font-semibold text-indigo-700 text-center">
                    {review.name}
                  </h3>
                  <p className="text-yellow-500 text-center mt-1 text-xl">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </p>
                  <p className="text-gray-600 text-center mt-3 italic">
                    “{review.message}”
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3 text-gray-600">
                No reviews available yet. Be the first to share your experience!
              </p>
            )}
          </div>

          {/* Submit Review Form */}
          <div className="mt-16 max-w-2xl mx-auto bg-white rounded-4xl shadow-2xl p-10 border-2 border-black">
            <h3 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
              Share Your Experience
            </h3>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Rating
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select rating</option>
                  <option value="5">★★★★★ - Excellent</option>
                  <option value="4">★★★★☆ - Good</option>
                  <option value="3">★★★☆☆ - Average</option>
                  <option value="2">★★☆☆☆ - Poor</option>
                  <option value="1">★☆☆☆☆ - Terrible</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Your Review
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your feedback..."
                  className="w-full border border-gray-300 rounded-xl p-3 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Review;
