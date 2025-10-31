import React, { useContext } from 'react';
import AppContext from '../../Context/AppContext';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Navbar from '../Navbar';

const ShowProduct = () => {
  const { products, AddtoCart, wishlist, AddToWishlist, RemoveWishlist } = useContext(AppContext);

  const handleWishlist = (i) => {
    const exists = wishlist.some((item) => item.ProductId === i._id);
    if (exists) {
      RemoveWishlist(i._id);
    } else {
      AddToWishlist(i._id, i.Title, i.Price, i.Image);
    }
  };

  return (
    <>
      <Navbar />

      {/* 🟦 Banner */}
      <section className="banner relative flex items-center justify-center">
        <div className="banner-content text-center relative z-10">
          <h1 className="head">Products</h1>
          <p className="subhead">
            <a href="#" className="Home opacity-80 hover:opacity-100 cursor-pointer">
              Home
            </a>
            <span className="mx-3">&gt;</span>
            <span className="font-medium">Products</span>
          </p>
        </div>
      </section>

      {/* 🛍️ Product Cards */}
      <div className="min-h-screen bg-[#d7dde8] flex justify-center items-center p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto p-6">
          {products?.map((i) => {
            const inWishlist = wishlist.some((item) => item.ProductId === i._id);

            return (
              <div
                key={i._id}
                className="flex flex-col bg-white border-2 border-black rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gray-100">
                  <img
                    src={i.Image || "/placeholder.jpg"}
                    alt={i.Title}
                    className="w-full h-full object-contain cursor-pointer"
                  />
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                    {i.Category}
                  </span>
                </div>

                {/* Details */}
                <div className="border-t-2 border-black p-5 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                    {i.Title}
                  </h2>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 text-sm">
                      <strong>Qty:</strong> {i.Quantity}
                    </span>
                    <span className="text-green-600 font-bold text-lg">₹{i.Price}</span>
                  </div>

                  <p className="text-gray-600 text-sm flex-grow line-clamp-2 mb-4">
                    {i.Description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => AddtoCart(i._id, i.Title, i.Price, 1, i.Image)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl shadow-md text-center transition-all duration-300 cursor-pointer"
                      >
                        Add to Cart
                      </button>

                      <Link
                        to={`/ProductDetails/${i._id}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl shadow-md text-center transition-all duration-300"
                      >
                        View Details
                      </Link>
                    </div>

                    {/* ❤️ Wishlist Button */}
                    <button
                      onClick={() => handleWishlist(i)}
                      className={`w-full py-2 rounded-xl shadow-md text-white transition-all duration-300 cursor-pointer ${
                        inWishlist
                          ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                          : "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                      }`}
                    >
                      {inWishlist ? "❤️ Added to Wishlist" : "♡ Add to Wishlist"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ShowProduct;
