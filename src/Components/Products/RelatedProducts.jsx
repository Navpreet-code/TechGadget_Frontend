import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";

const RelatedProducts = ({ category, currentProductId }) => {
  const { products, AddtoCart, AddToWishlist } = useContext(AppContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products && category) {
      const filteredProducts = products.filter(
        (i) =>
          i?.Category?.toLowerCase() === category.toLowerCase() &&
          i._id !== currentProductId
      );
      setRelatedProducts(filteredProducts);
    }
  }, [category, currentProductId, products]);

  if (!relatedProducts || relatedProducts.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        No Related Products Found...
      </div>
    );
  }

  return (
    <div className="bg-[#d7dde8] py-10 px-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Related Products
      </h2>

      {/* ✅ Responsive Grid with Center Alignment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center max-w-7xl mx-auto">
        {relatedProducts.map((i) => (
          <div
            key={i._id}
            className="flex flex-col bg-white border border-gray-300 rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden w-[280px] sm:w-[260px] md:w-[270px] lg:w-[260px]"
          >
            {/* 🖼️ Image Section */}
            <div className="relative w-full h-52 bg-gray-100 flex items-center justify-center p-4">
              <img
                src={i.Image || "/placeholder.jpg"}
                alt={i.Title}
                className="w-full h-full object-contain"
              />
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                {i.Category}
              </span>
            </div>

            {/* 📄 Details Section */}
            <div className="p-4 flex flex-col flex-grow border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                {i.Title}
              </h3>

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 text-sm">
                  <strong>Qty:</strong> {i.Quantity}
                </span>
                <span className="text-green-600 font-bold">₹{i.Price}</span>
              </div>

              <p className="text-gray-600 text-sm line-clamp-2 flex-grow mb-3">
                {i.Description}
              </p>

              {/* 🟩 Buttons */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      AddtoCart(i._id, i.Title, i.Price, 1, i.Image)
                    }
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl shadow-md text-center transition-all duration-300 cursor-pointer"
                  >
                    Add to Cart
                  </button>

                  <Link
                    to={`/ProductDetails/${i._id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-center shadow-md transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>

                {/* 💖 Wishlist Button */}
                <button
                  onClick={() =>
                    AddToWishlist(i._id, i.Title, i.Price, i.Image)
                  }
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-xl shadow-md transition-all duration-300 cursor-pointer"
                >
                Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
