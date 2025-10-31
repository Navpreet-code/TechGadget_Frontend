import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../Context/AppContext";

const ProductAdminDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const { products } = useContext(AppContext);

  // Find product by ID
  const product = products?.find((p) => p._id === id) || products?.[0];

  if (!product) return <p className="p-6 text-center">No product found!</p>;

  return (
    <div className="flex min-h-screen bg-[#d7dde8]">
      {/* Sidebar Overlay (Mobile) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-gray-200 flex flex-col justify-between rounded-r-2xl shadow-2xl 
        border-t-2 border-r-2 border-b-2 border-black border-l-0 
        transform transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="px-10 py-7 w-full bg-gradient-to-r from-blue-300 to-blue-500 flex items-center justify-center shadow-md rounded-tr-xl">
            <h1 className="text-xl font-bold text-blue-900 tracking-wide">Tech Gadgets</h1>
          </div>

          <nav className="flex flex-col gap-3 px-2 mt-8">
            {[
              { to: "/AdminProducts", icon: "fa-gauge", label: "Dashboard" },
              { to: "/AdminProducts", icon: "fa-box", label: "Products" },
              { to: "/AdminOrders", icon: "fa-cart-shopping", label: "Orders" },
              { to: "/AdminContacts", icon: "fa-users", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative px-4 py-2 rounded-r-full flex items-center gap-2 text-black font-medium overflow-hidden group text-sm md:text-base cursor-pointer"
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-blue-600 transition-all duration-700 group-hover:w-full -z-10"></span>
                <i className={`fa-solid ${item.icon} z-10 group-hover:scale-110 transition-transform duration-300`}></i>
                <span className="z-10 group-hover:text-white transition-colors duration-300">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="px-5 py-5 border-t border-black">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-4xl flex items-center justify-center gap-2 transition-all duration-150 text-sm md:text-base cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02]">
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full md:ml-64 p-4 md:p-6 overflow-x-hidden relative">
        {/* Mobile Toggle Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg"
          >
            <i className="fa-solid fa-bars"></i> Menu
          </button>
        </div>

        {/* Title and View Button */}
        <div className="flex justify-center relative mb-8">
          <h1 className="text-center text-2xl font-bold text-black">Product Detail</h1>

          <Link
            to="/Products"
            className="absolute top-0 right-0 m-6 flex items-center gap-2 bg-blue-600 text-white px-3 md:px-5 py-2 rounded-4xl font-medium hover:bg-blue-800 transition text-sm md:text-base hover:shadow-lg hover:scale-[1.02]"
          >
            <i className="fa-solid fa-list"></i> View All Products
          </Link>
        </div>

        {/* Single Product Card - Modern Design */}
        <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-300 to-blue-500 rounded-4xl shadow-2xl overflow-hidden border-2 border-black mx-auto mt-12 w-[700px] h-[420px]">
          {/* Left: Product Image */}
          <div className="md:w-1/2 h-full flex items-center justify-center overflow-hidden flex-shrink-0 bg-white rounded-l-3xl shadow-inner">
            <img
              src={product.image || product.Image}
              alt={product.title || product.Title}
              className="max-w-full max-h-full object-contain object-center transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Right: Product Details */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-black">{product.title || product.Title}</h2>
              <p className="text-[#0F2027]">
                <span className="font-semibold">Category:</span> {product.category || product.Category}
              </p>
              <p className="text-[#0F2027]">
                <span className="font-semibold">Quantity:</span> {product.quantity || product.Quantity}
              </p>
              <p className="text-[#0F2027]">
                <span className="font-semibold">Price:</span> ₹{product.price || product.Price}
              </p>
              <p className="text-[#0F2027]">
                <span className="font-semibold">Description:</span> {product.description || product.Description}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductAdminDetails;
