import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Context/AppContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

// ✅ Razorpay script loader
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const {
    GetAllAddresses,
    cartItems,
    AddtoCart,
    DecreaseQty,
    RemoveCart,
    ClearCart,
    savePaymentDetails,
  } = useContext(AppContext);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Cart totals
  const totalQty = cartItems?.reduce((acc, item) => acc + item.Quantity, 0) || 0;
  const totalPrice =
    cartItems?.reduce((acc, item) => acc + item.Price * item.Quantity, 0) || 0;

  // ✅ Load selected address
  useEffect(() => {
    const fetchSelectedAddress = async () => {
      setLoading(true);
      const selectedAddressId = localStorage.getItem("selectedAddressId");

      if (!selectedAddressId) {
        alert("No address selected! Please select or add an address first.");
        navigate("/AddressDetails");
        return;
      }

      const data = await GetAllAddresses();
      const address = data?.data?.find((addr) => addr._id === selectedAddressId);

      if (!address) {
        alert("Selected address not found!");
        navigate("/AddressDetails");
        return;
      }

      setSelectedAddress(address);
      setLoading(false);
    };

    fetchSelectedAddress();
  }, [GetAllAddresses, navigate]);

  // ✅ Payment Handler
  const paymentHandler = async (response) => {
    const { razorpay_payment_id } = response;

    if (!razorpay_payment_id) {
      alert("Payment failed");
      navigate("/fail");
      return;
    }

    // Generate Dummy Order ID
    const generateDummyOrderId = () => {
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 100000);
      return `order_${timestamp}_${randomNum}`;
    };

    // Prepare Payment Data
    const paymentData = {
      PaymentId: razorpay_payment_id,
      orderId: generateDummyOrderId(),
      Amount: totalPrice,
      cartItems,
      UserAddress: selectedAddress,
      PayStatus: "Success",
    };

    const result = await savePaymentDetails(paymentData);

    if (result?.success) {
      alert("Payment successful!");
      ClearCart();
      navigate(`/Success`);
    } else {
      alert("Failed to save payment details. Please contact support.");
    }
  };

  // ✅ Initialize Razorpay Payment
  const handlePayment = async () => {
    if (!selectedAddress) {
      alert("Please select a shipping address before payment!");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK. Please check your connection.");
      return;
    }

    const options = {
      key: "rzp_test_A3RM3Asww6uWvF",
      amount: totalPrice * 100,
      currency: "INR",
      name: "Tech Gadgets",
      description: "Checkout Payment",
      handler: function (response) {
        paymentHandler(response); // ✅ Call async function properly
      },
      prefill: {
        name: selectedAddress?.FullName || "Guest",
        email: "techgadgets2025@gmail.com",
        contact: selectedAddress?.PhoneNumber || "9999999999",
      },
      theme: { color: "#F46432" },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <>
      <Navbar />

      {/* Banner */}
      <section className="banner relative flex items-center justify-center">
        <div className="banner-content text-center relative z-10">
          <h1 className="head">Checkout</h1>
          <p className="subhead">
            <a href="/" className="Home opacity-80 hover:opacity-100 cursor-pointer">
              Home
            </a>
            <span className="mx-3">&gt;</span>
            <span className="font-medium">Checkout</span>
          </p>
        </div>
      </section>

      {/* Checkout Body */}
      <section className="min-h-screen py-10 px-5 bg-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT - Cart Details */}
          <div className="lg:col-span-2 bg-white rounded-4xl shadow-lg p-6 border-2 border-black">
            <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
              Order Summary
            </h2>

            {cartItems && cartItems.length > 0 ? (
              <>
                <div className="space-y-5">
                  {cartItems.map((item) => (
                    <div
                      key={item.ProductId}
                      className="flex items-center gap-4 bg-gray-100 rounded-2xl p-4 shadow-md hover:shadow-lg transition"
                    >
                      <img
                        src={item.Image}
                        alt={item.Title}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.Title}</h3>
                        <p className="text-green-600 font-medium">₹{item.Price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => DecreaseQty(item.ProductId, 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-semibold">{item.Quantity}</span>
                        <button
                          onClick={() =>
                            AddtoCart(
                              item.ProductId,
                              item.Title,
                              item.Price / item.Quantity,
                              1,
                              item.Image
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to remove this item?")) {
                            RemoveCart(item.ProductId);
                          }
                        }}
                        className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm shadow cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-8 bg-gray-200 p-5 rounded-xl flex justify-between items-center font-semibold text-lg shadow">
                  <p>
                    Total Items: <span className="text-blue-700">{totalQty}</span>
                  </p>
                  <p className="text-xl">
                    Total: <span className="text-green-600">₹{totalPrice}</span>
                  </p>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </div>

          {/* RIGHT - Address + Payment */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-black">
            <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
              Shipping Address
            </h2>

            {loading ? (
              <p className="text-center text-gray-500">Loading Address...</p>
            ) : selectedAddress ? (
              <div className="block p-4 rounded-xl border-2 border-indigo-500 bg-indigo-50">
                <h3 className="font-semibold text-lg">{selectedAddress.FullName}</h3>
                <p className="text-gray-700 text-sm leading-snug">
                  {selectedAddress.Address}, {selectedAddress.City},{" "}
                  {selectedAddress.State}, {selectedAddress.Country} -{" "}
                  {selectedAddress.PinCode}
                </p>
                <p className="text-gray-600 text-sm">
                  Phone: {selectedAddress.PhoneNumber}
                </p>
              </div>
            ) : (
              <p className="text-center text-red-500">No address selected!</p>
            )}

            <button
              disabled={!selectedAddress || cartItems.length === 0}
              onClick={handlePayment}
              className="w-full mt-6 bg-blue-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold shadow-lg transition cursor-pointer"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Checkout;
