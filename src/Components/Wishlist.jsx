import React, { useContext } from "react";
import AppContext from "../Context/AppContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Wishlist = () => {
  const { wishlist, RemoveWishlist, AddtoCart } = useContext(AppContext);

  return (
    <>
      <Navbar />

      {/* 🩷 Banner */}
      <section className="banner relative flex items-center justify-center">
        <div className="banner-content text-center relative z-10">
          <h1 className="head">Wishlist</h1>
          <p className="subhead">
            <a
              href="/"
              className="Home opacity-80 hover:opacity-100 cursor-pointer"
            >
              Home
            </a>
            <span className="mx-3">&gt;</span>
            <span className="font-medium">Wishlist</span>
          </p>
        </div>
      </section>

      {/* 💖 Wishlist Items */}
      <div className="max-w-6xl mx-auto py-8 px-4 space-y-6">
        {wishlist && wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div
              key={item.ProductId}
              className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow relative"
            >
              {/* 🖼️ Product Image */}
              <div className="md:w-1/4 flex justify-center items-center bg-gray-50 p-4 relative">
                <img
                  src={item.Image || "/placeholder.jpg"}
                  alt={item.Title}
                  className="w-full h-32 object-contain rounded-xl"
                />
                {item.Category && (
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                    {item.Category}
                  </span>
                )}
              </div>

              {/* 📋 Product Info */}
              <div className="md:w-3/4 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.Title}
                    </h2>
                    <p className="text-green-600 font-bold text-lg">
                      ₹{item.Price}
                    </p>
                  </div>

                  {item.Quantity && (
                    <p className="text-gray-600 text-sm mb-2">
                      <strong>Qty:</strong> {item.Quantity}
                    </p>
                  )}

                  {item.Description && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {item.Description}
                    </p>
                  )}
                </div>

                {/* 🔘 Buttons */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      AddtoCart(
                        item.ProductId,
                        item.Title,
                        item.Price,
                        1,
                        item.Image
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer transition-all"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => RemoveWishlist(item.ProductId)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">
            Your Wishlist is Empty 
          </p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Wishlist;
