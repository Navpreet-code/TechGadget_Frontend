import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AppContext from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:3000/api/Product";

const Home = () => {
  const { AddtoCart } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // 🟢 Fetch Categories
  useEffect(() => {
    axios
      .get(`${API}/GetCategories`)
      .then((res) => {
        if (res.data.success) setCategories(res.data.categories);
        else toast.info("No categories found.");
      })
      .catch(() => toast.error("Failed to load categories."));
  }, []);

  // 🟢 Fetch Featured Products (Top 4)
  useEffect(() => {
    axios
      .get(`${API}/GetProducts`)
      .then((res) => {
        if (res.data.success && res.data.products.length > 0) {
          setProducts(res.data.products.slice(0, 4)); // only 4 products for home
        }
      })
      .catch(() => toast.error("Failed to load products."));
  }, []);

  return (
    <>
      <Navbar />

      {/* 🏠 HERO SECTION */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-24 bg-gradient-to-r from-[#7794cc] to-[#c1cfe4] text-white overflow-hidden">
        <div className="md:w-1/2 space-y-6 z-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Upgrade Your World with <br />{" "}
            <span className="text-yellow-300">Next-Gen Tech</span>
          </h1>
          <p className="text-lg opacity-90">
            Explore cutting-edge gadgets, smart devices, and electronics — all
            in one trusted store. Experience convenience, style, and innovation.
          </p>
          <a
            href="/products"
            className="inline-block mt-4 bg-white text-[#4b6cb7] px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Shop Now
          </a>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 relative">
          <img
            src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=900&q=80"
            alt="Smart Gadgets"
            className="rounded-3xl shadow-2xl w-full hover:scale-105 transition-transform duration-700"
          />
        </div>
      </section>

      {/* 🛍️ DYNAMIC FEATURED CATEGORIES */}
      <section className="py-20 px-6 md:px-20 bg-white text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          Explore Top Categories
        </h2>

        {categories.length === 0 ? (
          <p className="text-gray-500">Loading categories...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={
                    cat.image ||
                    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80"
                  }
                  alt={cat}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-white text-2xl font-semibold">
                    {cat}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 💎 DYNAMIC FEATURED PRODUCTS */}
      <section className="py-20 px-6 md:px-20 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          Featured Products
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {products.map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <img
                  src={
                    p.Image ||
                    "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5?auto=format&fit=crop&w=600&q=80"
                  }
                  alt={p.Title}
                  className="w-full h-56 object-contain rounded-t-2xl bg-gray-100 p-2"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {p.Title}
                  </h3>
                  <p className="text-[#4b6cb7] font-bold mt-2">
                    ₹{p.Price?.toLocaleString()}
                  </p>

                  <button
                    onClick={() =>
                      AddtoCart(p._id, p.Title, p.Price, 1, p.Image)
                    }
                    className="mt-4 bg-[#4b6cb7] text-white px-5 py-2 rounded-full hover:bg-[#3a57a3] transition w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🎮 OFFER BANNER */}
      <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-[#c1cfe4] to-[#7794cc] text-white text-center">
        <h2 className="text-3xl font-bold mb-3">🎮 Special Festive Sale</h2>
        <p className="opacity-90 text-lg mb-6">
          Get up to{" "}
          <span className="font-semibold text-yellow-300">40% OFF</span> on top
          gadgets and accessories. Limited time only!
        </p>
        <a
          href="/offers"
          className="inline-block bg-white text-[#4b6cb7] px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
        >
          View Offers
        </a>
      </section>

      {/* ⭐ CUSTOMER REVIEWS */}
      <section className="py-20 px-6 md:px-20 bg-white text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Rohit Sharma",
              review:
                "Amazing service! The product quality is excellent and delivery was super quick.",
            },
            {
              name: "Simran Kaur",
              review:
                "Loved my new smartwatch! TechMart really provides genuine and reliable products.",
            },
            {
              name: "Arjun Mehta",
              review:
                "Top-notch customer support. Great collection and best deals on electronics!",
            },
          ].map((r, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
            >
              <p className="text-gray-600 mb-4 italic">“{r.review}”</p>
              <h3 className="text-lg font-semibold text-gray-800">{r.name}</h3>
              <p className="text-yellow-500 mt-1">★★★★★</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 CTA SECTION */}
      <section className="py-16 px-6 md:px-20 bg-[#4b6cb7] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Experience Innovation Like Never Before
        </h2>
        <p className="opacity-90 mb-8">
          Join thousands of tech lovers. Explore, shop, and stay ahead with the
          latest in electronics.
        </p>
        <a
          href="/products"
          className="inline-block bg-white text-[#4b6cb7] px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
        >
          Start Shopping
        </a>
      </section>

      <Footer />
    </>
  );
};

export default Home;
