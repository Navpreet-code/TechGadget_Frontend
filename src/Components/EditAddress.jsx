import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AppContext from "../Context/AppContext";

const EditAddress = () => {
  const { id } = useParams(); // Get address ID from URL
  const { GetAllAddresses, UpdateAddress } = useContext(AppContext);
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

  const [loading, setLoading] = useState(true);

  // Fetch the address by ID and prefill the form
  useEffect(() => {
    const fetchAddress = async () => {
      const data = await GetAllAddresses();
      const address = data?.data.find((addr) => addr._id === id);
      if (address) {
        setFormData({
          FullName: address.FullName || "",
          PhoneNumber: address.PhoneNumber || "",
          City: address.City || "",
          State: address.State || "",
          Country: address.Country || "",
          PinCode: address.PinCode || "",
          Address: address.Address || "",
        });
      }
      setLoading(false);
    };
    fetchAddress();
  }, [id, GetAllAddresses]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UpdateAddress(
        id,
        formData.FullName,
        formData.PhoneNumber,
        formData.City,
        formData.State,
        formData.Country,
        formData.PinCode,
        formData.Address
      );
      alert("Address updated successfully!");
      navigate("/AddressDetails"); 
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update address");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="text-center text-gray-500 mt-10">Loading address...</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Banner */}
      <section className="banner relative flex items-center justify-center">
        <div className="banner-content text-center relative z-10">
          <h1 className="head">Edit Address</h1>
          <p className="subhead">
            <a href="/" className="Home opacity-80 hover:opacity-100 cursor-pointer">
              Home
            </a>
            <span className="mx-3">&gt;</span>
            <span className="font-medium">Edit Address</span>
          </p>
        </div>
      </section>

      {/* Form Section */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-2xl bg-white border-2 border-black shadow-2xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-black text-center">
            Edit Address
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
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
                type="tel"
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

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-between">
              <button
                type="submit"
                className="w-full mt-2 bg-blue-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-2xl shadow-lg transition cursor-pointer"
              >
                Update Address
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditAddress;
