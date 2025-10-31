import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Update input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const res = await axios.post("https://api-techgadget-backend.onrender.com/api/Contact/AddContact", {
        name,
        email,
        message
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({ name: "", email: "", message: "" }); 
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <Navbar />

      {/* Full Page Background */}
      <div className="bg-[#d7dde8] min-h-screen">

        {/* Banner Section */}
        <section className="banner relative flex items-center justify-center">
          <div className="banner-content text-center relative z-10 py-16">
            <h1 className="head text-4xl font-bold text-indigo-800 mb-2">Contact</h1>
            <p className="subhead text-gray-700">
              <a href="#" className="opacity-80 hover:opacity-100 cursor-pointer">Home</a>
              <span className="mx-3">&gt;</span>
              <span className="font-medium">Contact</span>
            </p>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {/* Address */}
            <div className="bg-white shadow-md rounded-3xl p-9 text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <img src="/assets/Location.png" alt="Location" className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Our Address</h3>
              <p className="text-gray-600">123 Street, Amritsar, Punjab, India</p>
            </div>

            {/* Phone */}
            <div className="bg-white shadow-md rounded-3xl p-9 text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <img src="/assets/Phone.png" alt="Phone" className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            {/* Email */}
            <div className="bg-white shadow-md rounded-3xl p-9 text-center hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <img src="/assets/Mail.png" alt="Email" className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">info@yourwebsite.com</p>
            </div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            
            {/* Form Card */}
            <div className="bg-white shadow-xl rounded-4xl p-8 border border-gray-200 hover:shadow-2xl transition duration-300">
              <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">Get in Touch</h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 required"
                    placeholder="Enter your Name" 
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 required"
                    placeholder="Enter your Email"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500 required"
                    placeholder="Write your Message here..."
                  />
                </div>

                {/* Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium px-8 py-3 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.042201106542!2d74.87226407559407!3d31.633979343527533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391964a4c6f66b55%3A0x8a0b5d22d1b8d83b!2sAmritsar%2C%20Punjab!5e0!3m2!1sen!2sin!4v1692107893174!5m2!1sen!2sin"
                width="100%"
                height="520"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </section>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ContactUs;
