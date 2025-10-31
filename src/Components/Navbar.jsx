import React, { useContext, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AppContext from "../Context/AppContext";

// ✅ Base API
const API = "http://localhost:3000/api/Product";

// ✅ User Dropdown
const UserDropdown = ({ targetRef, isOpen, onClose }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();
  const { Logout, isAuthenticated } = useContext(AppContext);
  

  useEffect(() => {
    if (targetRef.current && isOpen) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  }, [targetRef, isOpen]);

  const menuItems = isAuthenticated
    ? [
        { label: "My Profile", path: "/Profile" },
        { label: "Change Password", path: "/ChangeUserPassword" },
        { label: "Logout", action: "logout" },
      ]
    : [
        { label: "Register", path: "/Register" },
        { label: "Login", path: "/Login" },
      ];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            width: 160,
            background: "white",
            borderRadius: 12,
            boxShadow: "0 8px 12px rgba(0,0,0,0.15)",
            zIndex: 1000,
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              className="block w-full text-center p-2 hover:bg-[#7794cc] cursor-pointer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              onClick={() => {
                if (item.action === "logout") {
                  Logout();
                  onClose();
                  navigate("/Login");
                } else {
                  navigate(item.path);
                  onClose();
                }
              }}
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// ✅ Navbar Component
const Navbar = () => {
  const { cartItems, wishlist, setProducts } = useContext(AppContext);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userIconRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const navigate = useNavigate();


  // 🟢 Load all categories
  useEffect(() => {
    axios
      .get(`${API}/GetCategories`)
      .then((res) => {
        if (res.data.success) setCategories(res.data.categories);
        else toast.info("No categories found.");
      })
      .catch(() => toast.error("Failed to load categories."));
  }, []);

  // 🟢 Search by title
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.warning("Please enter a search term!");
      return;
    }

    try {
      const res = await axios.get(`${API}/Search/${searchTerm}`);
      if (res.data.success) {
        setProducts(res.data.data);
        navigate("/Products");
      } else {
        toast.info(res.data.message || "No products found.");
      }
    } catch {
      toast.error("Search request failed!");
    }
  };

// 🟢 Category-based products
const handleCategoryChange = async (e) => {
  const category = e.target.value;
  if (!category) return;

  try {
    console.log("Fetching category:", category);
    const res = await axios.get(`${API}/Category/${category}`);
    console.log("Response data:", res.data);

    if (res.data.success) {
      setProducts(res.data.products);
      navigate("/Products");
    } else {
      toast.info("No products found in this category.");
    }
  } catch (error) {
    console.error("Category fetch error:", error);
    toast.error("Failed to fetch products for this category.");
  }
};


  // 🟢 Outside click closes dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userIconRef.current && !userIconRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
      // <header className="navbar-wrapper sticky-navbar shadow">
        <header className={`navbar-wrapper sticky-navbar shadow`}>

      {/* ✅ Top Bar */}
      <div className="top-bar flex justify-between items-center px-6 py-2 text-sm">
        <div className="flex gap-4 items-center">
          <p className="flex items-center gap-2 phone">
            <img src="/assets/Phone.png" alt="Phone" /> +001 2233 456
          </p>
          <div className="separator"></div>
          <p className="flex items-center gap-2 email-contact">
            <img src="/assets/Mail.png" alt="Email" /> contact@company.com
          </p>
        </div>
        <div className="sale-text text-center">
          Summer sale discount off <span>50%</span>! Shop Now
        </div>
        <div className="flex items-center gap-6">
          <Link to="/Contact">
            <p className="flex items-center gap-2 location">
              <img src="/assets/Location.png" alt="Location" /> Location
            </p>
          </Link>
          <div className="separator"></div>
          <div className="social flex gap-3 mt-2">
            <a href="https://facebook.com">
              <img src="/assets/Facebook.png" alt="Facebook" />
            </a>
            <a href="https://instagram.com">
              <img src="/assets/instagram.png" alt="Instagram" />
            </a>
            <a href="https://linkedin.com">
              <img src="/assets/LinkedIn.png" alt="LinkedIn" />
            </a>
            <a href="https://youtube.com">
              <img src="/assets/Youtube.png" alt="YouTube" />
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Main Navbar */}
      <div className="main-navbar flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <h1 className="logo cursor-pointer" onClick={() => navigate("/Home")}>
            Tech Gadgets
          </h1>

          {/* 🟢 Category Filter */}
          <select
            className="categories-dropdown"
            onChange={handleCategoryChange}
            defaultValue=""
          >
            <option value="" hidden>
              All Categories
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* 🟢 Links */}
        <nav className="menu-links flex gap-5">
          <Link to="/">Home</Link>
          <Link to="/Products">Products</Link>
          <Link to="/MyOrders">My Orders</Link>
          <Link to="#">Blog</Link>
          <Link to="/AboutUs">About</Link>
          <Link to="/Contact">Contact</Link>
        </nav>

        {/* ✅ Right Side */}
        <div className="flex items-center gap-5 header-right">
          {/* 🔍 Search */}
          <form onSubmit={handleSearch} className="search-box flex items-center">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:outline-none bg-transparent"
            />
            <button type="submit">
              <i className="fas fa-search mr-2"></i>
            </button>
          </form>

          {/* 🛒 Icons */}
          <div className="header-icons flex items-center gap-4 relative">
            <div ref={userIconRef}>
              <i
                className="far fa-user text-lg cursor-pointer"
                onClick={() => setUserDropdownOpen((prev) => !prev)}
              ></i>
            </div>
            <Link to="/Wishlist">
  <button
    type="button"
    className="relative w-10 h-10 flex items-center justify-center rounded-full hover:scale-105 transition"
  >
    <i className="far fa-heart text-gray-800"></i>
    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
      {wishlist?.length || 0}
    </span>
  </button>
</Link>


            <div className="relative">
              <Link to="/Carts">
                <button
                  type="button"
                  className="relative w-10 h-10 flex items-center justify-center rounded-full hover:scale-105 transition"
                >
                  <i className="fas fa-shopping-cart text-gray-800"></i>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
                    {cartItems?.length || 0}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Dropdown */}
      <UserDropdown
        targetRef={userIconRef}
        isOpen={userDropdownOpen}
        onClose={() => setUserDropdownOpen(false)}
      />
    </header>
  );
};

export default Navbar;
