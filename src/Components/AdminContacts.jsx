import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  const url = "https://api-techgadget-backend.onrender.com/api";


  // Example logout function
  const AdminLogout = () => {
    localStorage.removeItem("adminToken");
  };

  // Fetch contacts from backend
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/Contact/GetContacts`);
      if (res.data.success) {
        setContacts(res.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="flex">
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
              AdminLogout();
              navigate("/AdminLogin");
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-4xl flex items-center justify-center gap-2 transition-all duration-150 text-sm md:text-base cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Contact Messages</h1>

          {loading ? (
            <div className="text-center text-indigo-600 font-semibold py-20 text-lg">
              Loading contacts...
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center text-gray-500 font-medium py-20 text-lg">
              No contacts found.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300"
                >
                  <h2 className="text-xl font-semibold text-indigo-700 mb-2">{contact.name}</h2>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Email:</span> {contact.email}
                  </p>
                  <p className="text-gray-700 mb-3">
                    <span className="font-medium">Message:</span> {contact.message}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(contact.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminContacts;
