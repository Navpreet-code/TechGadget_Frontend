import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AppContext from "../Context/AppContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AllAddresses = () => {
  const { GetAllAddresses, RemoveAddress, UpdateSelectedAddress } = useContext(AppContext);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(
    localStorage.getItem("selectedAddressId") || null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      const data = await GetAllAddresses();
      setAddresses(data?.data || []);
      setLoading(false);
    };
    fetchAddresses();
  }, [GetAllAddresses]);

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to Remove this address?")) return;

    try {
      const res = await RemoveAddress(id);
      if (res?.success || res?.Message === "Address removed") {
        setAddresses(addresses.filter((addr) => addr._id !== id));
        if (selectedAddress === id) {
          setSelectedAddress(null);
          localStorage.removeItem("selectedAddressId");
        }
        alert("Address removed successfully!");
      } else {
        alert("Failed to remove address. Try again.");
        console.error("RemoveAddress response:", res);
      }
    } catch (error) {
      console.error("RemoveAddress error:", error);
      alert("Error removing address. Check console.");
    }
  };

  const handleSelect = (id) => {
    setSelectedAddress(id);
    localStorage.setItem("selectedAddressId", id);
  };

const handleProceed = async () => {
  if (!selectedAddress) {
    alert("Please select an address first!");
    return;
  }

  navigate("/checkout", { state: { selectedAddressId: selectedAddress } });
};


  return (
    <>
      <Navbar />

      <section className="banner relative flex items-center justify-center">
        <div className="banner-content text-center relative z-10">
          <h1 className="head">Address Details</h1>
          <p className="subhead">
            <a href="/" className="Home opacity-80 hover:opacity-100 cursor-pointer">
              Home
            </a>
            <span className="mx-3">&gt;</span>
            <span className="font-medium">Address Details</span>
          </p>
        </div>
      </section>

      <section className="min-h-screen py-10 px-5 bg-gray-100">
        {loading ? (
          <p className="text-center text-gray-500">Loading addresses...</p>
        ) : addresses.length === 0 ? (
          <p className="text-center text-red-500">No addresses found.</p>
        ) : (
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {addresses.map((address) => (
              <div
                key={address._id}
                className={`flex flex-col p-6 rounded-2xl border-2 transition-all duration-300
                  ${selectedAddress === address._id ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-gray-500"}
                `}
              >
                {/* Address Info */}
                <div className="flex items-start">
                  <input
                    type="radio"
                    name="selectedAddress"
                    value={address._id}
                    checked={selectedAddress === address._id}
                    onChange={() => handleSelect(address._id)}
                    className="mt-2 mr-4 w-4 h-4 accent-indigo-600 cursor-pointer flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-indigo-600">{address.FullName}</h2>
                    <p className="text-gray-700 text-md"><strong>Phone:</strong> {address.PhoneNumber || "-"}</p>
                    <p className="text-gray-700 text-md"><strong>City:</strong> {address.City || "-"}</p>
                    <p className="text-gray-700 text-md"><strong>State:</strong> {address.State || "-"}</p>
                    <p className="text-gray-700 text-md"><strong>Country:</strong> {address.Country || "-"}</p>
                    <p className="text-gray-700 text-md"><strong>Pin Code:</strong> {address.PinCode || "-"}</p>
                    <p className="text-gray-700 text-md"><strong>Address:</strong> {address.Address || "-"}</p>
                  </div>
                </div>

              {/* Edit & Remove Buttons */}
              <div className="flex gap-3 mt-4">
                <Link
                  to={`/EditAddress/${address._id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow text-md text-center cursor-pointer"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleRemove(address._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow text-md cursor-pointer"
                >
                  Remove
                </button>
              </div>

                {/* Proceed Button - only for selected card */}
                {selectedAddress === address._id && (
                  <div className="mt-4">
                    <button
                      onClick={handleProceed}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition w-full cursor-pointer"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default AllAddresses;
