import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBox, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; 
import { ImSpinner2 } from "react-icons/im"; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const url = "https://api-techgadget-backend.onrender.com/";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${url}/api/Payment/GetAllPayment`
        );
        if (res.data.success) {
          setOrders(res.data.data || res.data.payments || []);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

        <div className="px-5 py-5 border-t border-black">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-4xl flex items-center justify-center gap-2 transition-all duration-150 text-sm md:text-base cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02]">
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

        {/* Orders Section */}
        <section className="min-h-screen bg-gray-100 py-10 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center flex items-center justify-center gap-2">
              <FaBox className="w-8 h-8 text-blue-600" /> Admin Orders Dashboard
            </h1>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <ImSpinner2 className="animate-spin w-10 h-10 text-blue-600" />
              </div>
            ) : error ? (
              <div className="text-center text-red-600 font-semibold">{error}</div>
            ) : orders.length === 0 ? (
              <div className="text-center text-gray-600 text-lg font-medium">
                No orders found.
              </div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-300">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="bg-blue-600 text-white text-sm uppercase">
                    <tr>
                      <th className="px-6 py-3">#</th>
                      <th className="px-6 py-3">Payment ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr
                        key={order._id}
                        className={`border-b hover:bg-gray-50 transition ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="px-6 py-4 font-semibold">{index + 1}</td>
                        <td className="px-6 py-4">{order.PaymentId || "N/A"}</td>
                        <td className="px-6 py-4">
                          {order.UserAddress?.FullName || "Guest"}
                          <br />
                          <span className="text-xs text-gray-500">
                            {order.UserAddress?.PhoneNumber}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-green-600">
                          ₹{order.Amount?.toLocaleString() || 0}
                        </td>
                        <td className="px-6 py-4">
                          {order.PayStatus === "Success" ? (
                            <span className="flex items-center gap-1 text-green-600 font-medium">
                              <FaCheckCircle className="w-4 h-4" /> Success
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-red-600 font-medium">
                              <FaTimesCircle className="w-4 h-4" /> Failed
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(order.OrderDate).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => alert(JSON.stringify(order, null, 2))}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Orders;
