import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast,Zoom } from "react-toastify";

const AppState = ({ children }) => {
  // const url = "http://localhost:3000/api";
  const url = "https://api-techgadget-backend.onrender.com/api";
  
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [User, setUser] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [reload, setReload]= useState(false);
  const [addresses, setAddresses] = useState([]);

    // 🧩 Wishlist State
const [wishlist, setWishlist] = useState(() => {
  const savedWishlist = localStorage.getItem("wishlist");
  return savedWishlist ? JSON.parse(savedWishlist) : [];
});

  // Fetch Products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/Product/GetProducts`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setProducts(api.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProduct();
  }, []);

  // Load token on app start
  useEffect(() => {
    let Istoken = localStorage.getItem("token");
    if (Istoken) {
      setToken(Istoken);
      setIsAuthenticated(true);
    }
  }, []);


  // Fetch user profile after token is set
  useEffect(() => {
    if (token) {
      UserProfile();
      UserCart();
    }
  }, [token,reload]);



// Register (User)
const register = async (name, email, password) => {
  try {
    const response = await axios.post(
      `${url}/User/Register`,
      { name, email, password },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    const data = response.data;
    const isSuccess = data.success === true || data.success === "true";

    if (isSuccess) {
      toast.success(data.message || "Registered Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });

      if (data.token) {
        setToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem("token", data.token);
      }

    } else {
      toast.error(data.message || "Registration Failed!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    }
    return data;

  } catch (error) {
    console.error("Register Error:", error);
    toast.error("Something went wrong! Please try again later.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  }
};

// Login (User)
const login = async (email, password) => {
  try {
    const api = await axios.post(
      `${url}/User/Login`,
      { email, password },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    if (api.data.success) {
      toast.success(api.data.message || "Login Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });

      // ✅ Store token in AppState and localStorage
      if (api.data.token) {
        setToken(api.data.token);          // store in AppState
        setIsAuthenticated(true);          // update auth state
        localStorage.setItem("token", api.data.token); // store in localStorage
      }

    } else {
      toast.error(api.data.message || "Invalid Credentials!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    }

    // ✅ Always return success & token info
    return { success: api.data.success, token: api.data.token, message: api.data.message };

  } catch (error) {
    console.error("Login Error:", error);

    toast.error("Something went wrong! Please try again later.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });

    return { success: false, message: "Server error", token: null };
  }
};

  // Logout (User)
  const Logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 2000,
      transition: Zoom,
      style: { backgroundColor: "#dc2626", color: "#fff" },
    });
  };

// Profile (User)
  const UserProfile = async () => {
    try {
      const api = await axios.get(`${url}/User/Profile`, {
        headers: {
          "Content-Type": "application/json",
          "Authentication": token, 
        },
        withCredentials: true,
      });
      setUser(api.data.User);
    } catch (error) {
      console.error("User Profile Error:", error);
    }
  };

// Add Product 
  const AddProduct = async (Title, Category, Quantity, Price, Image, Description) => {
    try {
      const api = await axios.post(
        `${url}/Product/AddProducts`,
        { Title, Category, Quantity, Price, Image, Description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Product Added:", api);
    } catch (error) {
      console.error("Add Product Error:", error);
    }
  };

// Carts (Add) (User)
  const AddtoCart = async (ProductId, Title, Price, Quantity, Image) => {
  try {
    const api = await axios.post(
      `${url}/Cart/AddCarts`,
      { ProductId, Title, Price, Quantity, Image, },
      {
        headers: {
          "Content-Type": "Application/json",
          Authentication: token,
        },
        withCredentials: true,
      }
    );
    console.log("Cart Updated:", api.data);
    setReload(!reload)
    return api.data; 
  } catch (error) {
    console.error("Cart Error:", error );
  }
};

// Cart (Get) (User)
const UserCart = async () => {
  try {
    const api = await axios.get(`${url}/Cart/UserCarts`, {
      headers: {
        "Content-Type": "application/json",
        "Authentication": token,
      },
      withCredentials: true,
    });

    if (api.data.Cart_data) {
      setCartItems(api.data.Cart_data.items || []); 
    } else {
      setCartItems([]);
    }

  } catch (error) {
    console.error("User Cart Error:", error);
  }
};

// Cart (Decrease Qty) (User)
const DecreaseQty = async (ProductId, Quantity) => {
  const api = await axios.post(
    `${url}/Cart/DecreaseQty`,
    {ProductId,Quantity},
    {
      headers: {
        "Content-Type":"Application/json",
        "Authentication":token,
      }, 
      withCredentials:true,
    }
  );
  setReload(!reload)
}

// Cart (Remove) (User)
const RemoveCart = async (ProductId) => {
  try {
    const api = await axios.delete(
      `${url}/Cart/RemoveCarts/${ProductId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
        withCredentials: true,
      }
    );
    console.log(api.data); 
    setReload(!reload); 
  } catch (error) {
    console.error("Error removing product:", error);
  }
};

// Cart (Clear) (User)
 const ClearCart = async () => {
    try {
      const api = await axios.delete(`${url}/Cart/ClearCarts`, {
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
        withCredentials: true,
      });

      if (api.data) {
        setCartItems([]); 
        console.log("Cart cleared successfully!");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

// Address (Add) (User)
const ShippingAddress = async (FullName, PhoneNumber, City, State, Country, PinCode, Address) => {
  try {
    const api = await axios.post(`${url}/Address/AddAddress`,
      {FullName, PhoneNumber, City, State, Country, PinCode,Address,},
      {
        headers: {
          "Content-Type": "application/json",
          Authentication: token, 
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    console.log("Address Added:", api.data);
    return api.data;
  } catch (err) {
    console.error(" Error:", err);
  }
};

// Address (Get) (User)
const GetAllAddresses = async () => {
  try {
    const api = await axios.get(`${url}/Address/GetAddress`, {
      headers: {
        "Content-Type": "application/json",
        Authentication: token,
      },
      withCredentials: true,
    });
    return api.data; 
  } catch (error) {
    return [];  
  }
};

// Address (Remove) (User)
const RemoveAddress = async (id) => {
  try {
    const api = await axios.delete(`${url}/Address/RemoveAddress/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authentication: token,
      },
      withCredentials: true,
    });
    console.log("Remove Address Response:", api.data);
    return api.data;
  } catch (error) {
    console.error("RemoveAddress Error:", error);
    return { success: false, Message: "Error removing address" };
  }
};

// Address (Edit/Update) (User)
const UpdateAddress = async (id, FullName, PhoneNumber, City, State, Country, PinCode, Address) => {
  try {
    const api = await axios.put(`${url}/Address/EditAddress/${id}`,
      { FullName, PhoneNumber, City, State, Country, PinCode, Address,},
      {
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
        withCredentials: true,
      }
    );
    console.log("Address Updated:", api.data);
    setReload(!reload); 
    return api.data;
  } catch (error) {
    return { success: false, Message: "Error updating address" };
  }
};

//  Send OTP (User)
  const SendOTP = async (email) => {
    try {
      const res = await axios.post(`${url}/User/OTP`, { email });
      console.log("SendOTP response:", res.data);
      return res.data; 
    } catch (err) {
      console.error("Send OTP Error:", err);
      return { success: false, message: "Server error" };
    }
  };

  // Forgot password (User)
  const Forgot = async (email) => {
    return await SendOTP(email);
  };

  // Change Password (User)
  const ChangePassword = async ({ email, otp_code, password }) => {
    try {
      const res = await axios.post(`${url}/User/ChangePassword`, {
        email,
        otp_code,
        password,
      });
      console.log("ChangePassword response:", res.data);
      return res.data;
    } catch (err) {
      console.error("Change Password Error:", err);
      return { success: false, message: "Server error" };
    }
  };

  //  Change Password function (User)
const UserPassword = async ({ email, oldPassword, password }) => {
  try {
    if (!email || !oldPassword || !password) {
      return { success: false, message: "All fields are required." };
    }

    const response = await axios.put(
      `${url}/api/User/UserPassword`,
      { email, oldPassword, password }
    );
    return response.data;
  } catch (error) {
    console.error(
      "ChangePassword API Error:",
      error.response?.data || error.message
    );
    return error.response?.data || { success: false, message: "Something went wrong!" };
  }
};


// Payments (Add) (User)
const savePaymentDetails = async (paymentData) => {
  try {
    const response = await axios.post(`${url}/Payment/CreatePayment`, paymentData, 
      {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
      console.log("Payment Details Saved:", response.data.payment);
      return { success: true, payment: response.data.payment };
    } else {
      console.error("Failed To Save Payment Details: ", response.data.message);
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Error Saving Payment Details: ", error);
    return { success: false, message: "Error Saving Payment Details" };
  }
};

// Check localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) setIsAuthenticated(true);
  }, []);

  // Admin login
  const AdminLogin = async (email, password) => {
    try {
      const res = await axios.post(`${url}/Admin/Adminlogin`, { email, password });
      if (res.data.success && res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        setIsAuthenticated(true);
      }
      return res.data;
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  // Admin Logout
  const AdminLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    window.location.reload(); // Reload page immediately
  };



// 🧩 Wishlist Functions
const AddToWishlist = (productId, title, price, image) => {
  setWishlist((prev) => {
    const exists = prev.find((item) => item.ProductId === productId);
    if (exists) return prev;
    return [...prev, { ProductId: productId, Title: title, Price: price, Image: image }];
  });
};

const RemoveWishlist = (productId) => {
  setWishlist((prev) => prev.filter((item) => item.ProductId !== productId));
};

const ClearWishlist = () => {
  setWishlist([]);
  localStorage.removeItem("wishlist");
};

// 🧠 Save to LocalStorage Automatically
useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);




  return (
    <AppContext.Provider
      value={{products, setProducts, cartItems, addresses, url, token, isAuthenticated, User,
        register, login, Forgot, SendOTP, ChangePassword, setIsAuthenticated, Logout, UserPassword, AdminLogin,
        AdminLogout, AddProduct, AddtoCart, UserCart,  DecreaseQty, RemoveCart, ClearCart, ShippingAddress,
        GetAllAddresses, RemoveAddress, UpdateAddress, savePaymentDetails, wishlist, AddToWishlist, RemoveWishlist,
        ClearWishlist
      }}
    >
    {children}
    </AppContext.Provider>
  );
};

export default AppState;
