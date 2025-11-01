import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import axios from "axios";

const ProductAdmin = () => {
  const { products, AdminLogout } = useContext(AppContext);
  const navigate = useNavigate();
  // const url = "http://localhost:3000/api";
  const url = "https://api-techgadget-backend.onrender.com/api";


  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handledelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${url}/Product/DeleteProductsById/${id}`);
        window.location.reload();
      } catch (err) {
        console.log("Error while deleting product", err);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar overlay for mobile */}
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
                <span className="absolute left-0 top-0 h-full w-0 bg-blue-600 transition-all duration-800 group-hover:w-full -z-10"></span>
                <i className={`fa-solid ${item.icon} z-10 group-hover:scale-110 transition-transform duration-600`}></i>
                <span className="z-10 group-hover:text-white transition-colors duration-300">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="px-5 py-5 border-t border-black">
          <button
            onClick={() => {
              AdminLogout(); // remove token & update auth
              navigate("/AdminLogin"); // redirect to login
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-4xl flex items-center justify-center gap-2 transition-all duration-150 text-sm md:text-base cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 w-full md:ml-64 p-4 md:p-6 overflow-x-hidden">
        {/* Mobile toggle button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg"
          >
            <i className="fa-solid fa-bars"></i> Menu
          </button>
        </div>

        {/* Header */}
        <div className="relative mb-6">
          <h1 className="text-center text-sm md:text-2xl lg:text-2xl font-bold text-black">
            Products Dashboard
          </h1>

          <Link
            to="/AddProducts"
            className="absolute top-0 right-0 flex items-center gap-2 bg-blue-600 text-white px-3 md:px-5 py-2 md:py-2 rounded-4xl font-medium hover:bg-blue-800 transition text-sm md:text-base hover:shadow-lg hover:scale-[1.02]"
          >
            <i className="fa-solid fa-plus"></i> Add Product
          </Link>
        </div>

        {/* Table */}
        <table className="w-full table-auto rounded-2xl border-2 border-black shadow-lg overflow-hidden">
          <thead className="bg-blue-600 text-white uppercase text-sm md:text-base font-bold">
            <tr>
              <th className="px-4 py-3 text-center first:rounded-tl-2xl last:rounded-tr-2xl border-l border-white">S.No</th>
              <th className="px-4 py-3 text-center border-l border-white">Image</th>
              <th className="px-4 py-3 text-center border-l border-white">Title</th>
              <th className="px-4 py-3 text-center border-l border-white">Price</th>
              <th className="px-4 py-3 text-center border-l border-white">Description</th>
              <th className="px-4 py-3 text-center border-l border-white">Category</th>
              <th className="px-4 py-3 text-center border-l border-white">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300">
            {products?.length > 0 ? (
              products.map((i, index) => (
                <tr
                  key={i._id}
                  className={`transition cursor-pointer ${
                    index % 2 === 0 ? "bg-blue-100" : "bg-gray-200"
                  } hover:bg-blue-300`}
                >
                  <td className="px-4 py-3 text-center text-sm md:text-base border-l border-gray-300">{index + 1}</td>
                  <td className="px-4 py-3 text-center border-l border-gray-300">
                    {i.Image ? (
                      <div className="flex justify-center">
                        <img
                          src={i.Image}
                          alt={i.Title}
                          className="max-h-16 max-w-16 object-contain border border-gray-300 shadow-sm hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 flex items-center justify-center text-gray-400 text-xs md:text-sm mx-auto border border-gray-300">
                        No Img
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center text-sm md:text-base truncate max-w-[150px] border-l border-gray-300">{i.Title}</td>
                  <td className="px-4 py-3 text-center text-sm md:text-base border-l border-gray-300">₹{i.Price}</td>
                  <td className="px-4 py-3 text-center text-sm md:text-base truncate max-w-[200px] border-l border-gray-300">{i.Description}</td>
                  <td className="px-4 py-3 text-center border-l border-gray-300">
                    <span className="px-3 py-1 text-xs sm:text-sm md:text-sm font-medium">{i.Category}</span>
                  </td>
                  <td className="px-5 py-8 flex flex-nowrap justify-center gap-2 flex-shrink-0 border-l border-gray-300">
                    <Link to={`/EditProduct/${i._id}`} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs sm:text-sm md:text-sm flex items-center gap-1 transition transform hover:scale-105 shadow-sm">
                      <i className="fa-solid fa-pen-to-square"></i> Edit
                    </Link>
                    <Link to={`/AdminProductDetails/${i._id}`} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs sm:text-sm md:text-sm flex items-center gap-1 transition transform hover:scale-105 shadow-sm">
                      <i className="fa-solid fa-eye"></i> View
                    </Link>
                    <button onClick={() => handledelete(i._id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs sm:text-sm md:text-sm flex items-center gap-1 transition transform hover:scale-105 shadow-sm cursor-pointer">
                      <i className="fa-solid fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500 font-medium text-sm md:text-base">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ProductAdmin;
