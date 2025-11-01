import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();  
  // const url = "http://localhost:3000/api";
  const url = "https://api-techgadget-backend.onrender.com/";


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/Product/GetProductsById/${id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setName(api.data.Title);
        setPrice(api.data.Price);
        setCategory(api.data.Category);
        setImage(api.data.Image);
        setQuantity(api.data.Quantity);
        setDescription(api.data.Description);
        console.log("res", api.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${url}/Product/UpdateProductsById/${id}`, {
        Title: name,
        Category: category,
        Quantity: quantity,
        Price: price,
        Image: image,
        Description: description
      });

      navigate("/Products");
      window.location.reload();
    } catch (err) {
      console.error("Error During Updating Product:", err);
    }
  };

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
            <h1 className="text-xl font-bold text-blue-900 tracking-wide">
              Tech Gadgets
            </h1>
          </div>

          <nav className="flex flex-col gap-3 px-2 mt-8">
            {[
              { to: "/AdminDashboard", icon: "fa-gauge", label: "Dashboard" },
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
                <i
                  className={`fa-solid ${item.icon} z-10 group-hover:scale-110 transition-transform duration-300`}
                ></i>
                <span className="z-10 group-hover:text-white transition-colors duration-300">
                  {item.label}
                </span>
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
      <main className="flex-1 w-full md:ml-64 p-4 md:p-6 overflow-x-hidden">
        {/* Mobile Toggle Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg"
          >
            <i className="fa-solid fa-bars"></i> Menu
          </button>
        </div>

        {/* Add Product Form */}
        
        <div className="flex justify-center items-center min-h-screen">
          <Link to="/AdminProducts"
            className="absolute top-0 right-0 m-5 flex items-center gap-2 bg-blue-600 text-white px-3 md:px-5 py-2 md:py-2 rounded-4xl font-medium hover:bg-blue-800 transition text-sm md:text-base hover:shadow-lg hover:scale-[1.02]">
            <i className="fa-solid fa-list"></i> View All Products
          </Link>
          <form
            onSubmit={handleSubmit}
           className="bg-white p-8 rounded-4xl shadow-2xl w-full max-w-md border-2 border-black shadow-[0_10px_30px_rgba(0,0,0,0.9)]">

            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
              Edit Product
            </h2>

            {/* Success Message */}
            {message && (
              <p className="bg-green-100 text-green-700 text-center p-2 rounded-4xl mb-3">
                {message}
              </p>
            )}

            {/* Error Message */}
            {error && (
              <p className="bg-red-100 text-red-700 text-center p-2 rounded-4xl mb-3">
                {error}
              </p>
            )}

            {/* Form Fields */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Product Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border-2 border-[#283048] rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#eef2f3]"
                placeholder="Enter Product Name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Category:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border-2 border-[#283048] rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#eef2f3]"
                placeholder="Enter Category"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
               className="w-full p-2 border-2 border-[#283048] rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#eef2f3]"
                placeholder="Enter Quantity"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border-2 border-[#283048] rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#eef2f3]"
                placeholder="Enter Price"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Image:</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
               className="w-full p-2 border-2 border-[#283048] rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#eef2f3]"
                placeholder="Enter Image Link"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Description:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border-2 border-[#283048] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#eef2f3]"
                placeholder="Enter Product Description"
                rows="3"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 mt-2 rounded-3xl hover:bg-purple-700 transition cursor-pointer"
            >
              Update Product
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProduct;
