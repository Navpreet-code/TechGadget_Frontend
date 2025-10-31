import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import Footer from '../Footer';
import Navbar from '../Navbar';
import RelatedProducts from './RelatedProducts';

const ProductDetails = () => {
  const { products } = useContext(AppContext);
  const { id } = useParams();

  // Loading / fallback
  if (!products || products.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          Loading products...
        </div>
        <Footer />
      </>
    );
  }

  // Find selected product by ID
  const selectedProduct = products.find((p) => p._id === id);

  if (!selectedProduct) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          Product not found.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Banner */}
      <section className="banner relative flex items-center justify-center">
        <div className="banner-content text-center relative z-10">
          <h1 className="head">Product Detail</h1>
          <p className="subhead">
            <Link to="/" className="Home opacity-80 hover:opacity-100 cursor-pointer">
              Home
            </Link>
            <span className="mx-3">&gt;</span>
            <span className="font-medium">Product Detail</span>
          </p>
        </div>
      </section>

      {/* Product Card */}
      <div className="min-h-screen bg-[#d7dde8] flex justify-center items-center p-6">
        <div className="max-w-3xl w-full">
          <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-xl border-2 border-black overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-200">
            
            {/* Left - Image */}
            <div className="sm:w-1/2 w-full flex items-center justify-center bg-gray-100 p-4">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52">
                <img
                  src={selectedProduct.Image || "/placeholder.jpg"}
                  alt={selectedProduct.Title}
                  className="w-full h-full object-contain"
                />
                <span className="absolute -top-3 -left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {selectedProduct.Category}
                </span>
              </div>
            </div>

            {/* Right - Details */}
            <div className="flex flex-col sm:w-1/2 p-6 justify-center border-l-2 border-black">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {selectedProduct.Title}
              </h2>

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 text-sm sm:text-base">
                  <strong>Qty:</strong> {selectedProduct.Quantity}
                </span>
                <span className="text-green-600 font-bold text-lg sm:text-xl">
                  ₹{selectedProduct.Price}
                </span>
              </div>

              <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
                {selectedProduct.Description}
              </p>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-5">
            <RelatedProducts 
              category={selectedProduct.Category} 
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
