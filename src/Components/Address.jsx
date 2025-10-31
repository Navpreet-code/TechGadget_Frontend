import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AppContext from "../Context/AppContext";

const Address = () => {
  const { ShippingAddress } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FullName: "",
    PhoneNumber: "",
    City: "",
    State: "",
    Country: "",
    PinCode: "",
    Address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save the address via context
      const res = await ShippingAddress(
        formData.FullName,
        formData.PhoneNumber,
        formData.City,
        formData.State,
        formData.Country,
        formData.PinCode,
        formData.Address
      );

      if (res?.data?._id) {
        // Save newly added address as selected in localStorage
        localStorage.setItem("selectedAddressId", res.data._id);

        alert("Shipping Address Submitted Successfully!");

        // Navigate to checkout
        navigate("/Checkout");
      } else {
        alert("Failed to save address. Try again.");
        console.error("ShippingAddress response:", res);
      }
    } catch (err) {
      console.error("Error while submitting:", err);
      alert("Failed to submit address");
    }
  };

  const handleOldAddress = () => {
    navigate("/AddressDetails");
  };

  return (
    <>
      <Navbar />

      {/* Banner */}
      <section className="banner relative flex items-center justify-center">
        <div className="banner-content text-center relative z-10">
          <h1 className="head">Shipping Address</h1>
          <p className="subhead">
            <a href="/" className="Home opacity-80 hover:opacity-100 cursor-pointer">
              Home
            </a>
            <span className="mx-3">&gt;</span>
            <span className="font-medium">Shipping Address</span>
          </p>
        </div>
      </section>

      {/* Form Section */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-2xl bg-white border-2 border-black shadow-2xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-black text-center">
            Shipping Address
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="FullName"
                value={formData.FullName}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-gray-200 border border-black rounded-lg shadow-sm p-2"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="number"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-gray-200 border border-black rounded-lg shadow-sm p-2"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="City"
                value={formData.City}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-gray-200 border border-black rounded-lg shadow-sm p-2"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                name="State"
                value={formData.State}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-gray-200 border border-black rounded-lg shadow-sm p-2"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="Country"
                value={formData.Country}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-gray-200 border border-black rounded-lg shadow-sm p-2"
              />
            </div>

            {/* PinCode */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pin Code
              </label>
              <input
                type="text"
                name="PinCode"
                value={formData.PinCode}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-gray-200 border border-black rounded-lg shadow-sm p-2"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-gray-200 border border-black rounded-lg shadow-sm p-2"
              />
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex justify-between">
              <button
                type="button"
                onClick={handleOldAddress}
                className="mt-4 bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg transition cursor-pointer"
              >
                Use Old Address
              </button>

              <button
                type="submit"
                className="mt-4 bg-blue-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg transition cursor-pointer"
              >
                Submit & Checkout
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Address;
