import React, { useEffect, useState } from "react";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import { FaBoxOpen, FaUndoAlt, FaBan, FaTruck, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const url = "http://localhost:3000/api";
  const url = "https://api-techgadget-backend.onrender.com/api";

  const token = localStorage.getItem("token");

  const statusTabs = ["All", "Placed", "Shipped", "Delivered", "Cancelled", "Returned"];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url}/Payment/UserOrder`, {
          headers: { "Content-Type": "application/json", Authentication: token },
          withCredentials: true,
        });
        const data = res.data.orders || [];
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
        toast.error(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleFilter = (status) => {
    setSelectedStatus(status);
    if (status === "All") setFilteredOrders(orders);
    else setFilteredOrders(orders.filter((o) => o.OrderStatus === status));
  };

  // ✅ Fully working button actions
  const handleAction = async (orderId, newStatus) => {
    const confirmAction = window.confirm(`Are you sure you want to update status to "${newStatus}"?`);
    if (!confirmAction) return;

    try {
      const res = await axios.put(
        `${url}/Payment/Status/${orderId}`,
        { status: newStatus },
        { headers: { "Content-Type": "application/json", Authentication: token }, withCredentials: true }
      );

      toast.success(res.data.message || `Status updated to ${newStatus}`);

      // Update both orders and filteredOrders arrays to reflect change
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, OrderStatus: newStatus } : o));
      setFilteredOrders(prev => prev.map(o => o._id === orderId ? { ...o, OrderStatus: newStatus } : o));

    } catch (err) {
      toast.error(err.response?.data?.message || "Status update failed");
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-semibold inline-block transition-all duration-300 shadow-sm";
    switch (status) {
      case "Placed": return <span className={`${base} bg-blue-100 text-blue-700`}>{status}</span>;
      case "Shipped": return <span className={`${base} bg-yellow-100 text-yellow-700`}>{status}</span>;
      case "Delivered": return <span className={`${base} bg-green-100 text-green-700`}>{status}</span>;
      case "Cancelled": return <span className={`${base} bg-red-100 text-red-700`}>{status}</span>;
      case "Returned": return <span className={`${base} bg-gray-200 text-gray-800`}>{status}</span>;
      default: return <span className={`${base} bg-gray-100 text-gray-600`}>{status}</span>;
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <ImSpinner2 className="animate-spin text-indigo-600 text-5xl mb-4" />
      <p className="text-indigo-700 font-medium text-lg animate-pulse">Fetching your latest orders...</p>
    </div>
  );

  if (error) return <div className="text-center mt-20 text-red-600 font-semibold text-lg">{error}</div>;

  return (
    <>
      <Navbar />

         {/* Banner Section */}
      <section className="banner relative flex items-center justify-center">
        <div className="banner-content text-center relative z-10">
          <h1 className="head">My Orders</h1>
          <p className="subhead">
            <a href="#" className="Home opacity-80 hover:opacity-100 cursor-pointer">
              Home
            </a>
            <span className="mx-3">&gt;</span>
            <span className="font-medium">My Orders</span>
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto mt-6 flex flex-wrap justify-center gap-3 px-4">
        {statusTabs.map((status) => (
          <button
            key={status}
            onClick={() => handleFilter(status)}
            className={`py-2 px-5 rounded-full text-sm font-medium shadow-sm border transition-all duration-300 ${
              selectedStatus === status
                ? "bg-indigo-600 text-white scale-105"
                : "bg-white hover:bg-gray-50 text-gray-700 cursor-pointer"
                
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="min-h-screen py-10 px-4">
        <div className="max-w-7xl mx-auto bg-white shadow rounded-2xl overflow-hidden border border-gray-200">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-gray-500">
              <FaBoxOpen size={70} className="mb-4 text-gray-400" />
              <p className="text-xl font-medium">No orders found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-800 uppercase text-xs font-bold sticky top-0 z-10 shadow">
                    <th className="py-3 px-4 text-left">Sr.No</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Products</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 px-4 text-center">Price</th>
                    <th className="py-3 px-4 text-left">Address</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order, index) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-all duration-200">
                      <td className="py-3 px-4 font-medium">{index + 1}</td>
                      <td className="py-3 px-4 text-indigo-600 font-semibold">{order.UserAddress.FullName}</td>
                      <td className="py-3 px-4 text-gray-500">{new Date(order.OrderDate).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        {order.cartItems.map((item, i) => (
                          <div key={i} className="text-sm text-gray-700 mb-1">{item.Title}</div>
                        ))}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {order.cartItems.map((item, i) => (
                          <div key={i} className="text-sm text-gray-500 mb-1">{item.Quantity}</div>
                        ))}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {order.cartItems.map((item, i) => (
                          <div key={i} className="text-sm text-green-600 font-medium mb-1">₹{item.Price}</div>
                        ))}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {order.UserAddress.Address}, {order.UserAddress.City}, {order.UserAddress.State} - {order.UserAddress.PinCode}
                        <br /><span className="text-xs text-gray-500">📞 {order.UserAddress.PhoneNumber}</span>
                      </td>
                      <td className="py-3 px-4 text-center">{getStatusBadge(order.OrderStatus)}</td>

                      {/* ✅ Buttons functionality updated */}
                      <td className="py-3 px-4 text-center flex flex-wrap justify-center gap-2">
                        {[
                          { label: "Shipped", icon: <FaTruck />, color: "yellow" },
                          { label: "Delivered", icon: <FaCheckCircle />, color: "green" },
                          { label: "Returned", icon: <FaUndoAlt />, color: "gray" },
                          { label: "Cancelled", icon: <FaBan />, color: "red" }
                        ].map(btn => (
                          <button
                            key={btn.label}
                            onClick={() => handleAction(order._id, btn.label)}
                            disabled={order.OrderStatus === btn.label}
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium shadow-sm cursor-pointer
                              ${order.OrderStatus === btn.label
                                ? `bg-${btn.color}-100 text-${btn.color}-700 opacity-50 cursor-not-allowed`
                                : `bg-${btn.color}-100 hover:bg-${btn.color}-200 text-${btn.color}-700`}`}
                          >
                            {btn.icon} {btn.label}
                          </button>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserOrders;
