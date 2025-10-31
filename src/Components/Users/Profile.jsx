import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaHeart, FaRupeeSign } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import AppContext from '../../Context/AppContext';

const Profile = () => {
  const { User, cartItems = [], Logout } = React.useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:3000/api";
  const token = localStorage.getItem("token");

  // Fetch user orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url}/Payment/UserOrder`, {
          headers: { "Content-Type": "application/json", Authentication: token },
          withCredentials: true,
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Compute total purchases
  const totalPurchases = orders.reduce((acc, order) => acc + (order.Amount || 0), 0);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <ImSpinner2 className="animate-spin text-indigo-600 text-5xl mb-4" />
      <p className="text-indigo-700 font-medium text-lg animate-pulse">Fetching your profile data...</p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-6 relative overflow-hidden">
      
      <div className="bg-white shadow-2xl rounded-3xl p-10 border-3 border-black max-w-3xl w-full text-center">
        
        {/* User Avatar */}
        <div className="mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${User?.name || 'User'}&background=0D8ABC&color=fff&size=128`}
            alt={User?.name}
            className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 shadow-lg transition-transform transform hover:scale-110"
          />
        </div>

        {/* User Info */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{User?.name || "Guest"}</h1>
        <p className="text-gray-500 mb-8">{User?.email || "No Email Available"}</p>

        {/* Dynamic Info Cards */}
        <div className="flex flex-col md:flex-row justify-between gap-6">

          {/* Orders */}
          <div className="flex-1 bg-gradient-to-r from-blue-200 to-blue-100 text-blue-800 rounded-4xl p-4 shadow-md hover:shadow-xl transition-all flex items-center gap-4 min-h-[10px] transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
            <FaShoppingCart className="text-3xl text-blue-500" />
            <div className="flex flex-col items-start">
              <p className="font-medium text-sm uppercase tracking-wide">Total Orders</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
          </div>

          {/* Wishlist */}
          <div className="flex-1 bg-gradient-to-r from-red-200 to-red-100 text-red-800 rounded-4xl p-4 shadow-md hover:shadow-xl transition-all flex items-center gap-4 min-h-[10px] transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
            <FaHeart className="text-3xl text-red-500" />
            <div className="flex flex-col items-start">
              <p className="font-medium text-sm uppercase tracking-wide">Wishlist Items</p>
              <p className="text-2xl font-bold">{cartItems.length}</p>
            </div>
          </div>

          {/* Total Purchases */}
          <div className="flex-1 bg-gradient-to-r from-purple-200 to-purple-100 text-purple-800 rounded-4xl p-4 shadow-md hover:shadow-xl transition-all flex items-center gap-4 min-h-[10px] transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
            <FaRupeeSign className="text-3xl text-purple-500" />
            <div className="flex flex-col items-start">
              <p className="font-medium text-sm uppercase tracking-wide">Total Purchases</p>
              <p className="text-2xl font-bold">₹{totalPurchases}</p>
            </div>
          </div>

        </div>

        {/* Logout Button */}
        <div className="mt-10">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-3xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            onClick={Logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
