import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { FaHome, FaListAlt, FaStar } from 'react-icons/fa'; // ⭐ added FaStar icon

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  // Stop confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Success Message Section */}
      <div className="flex flex-col items-center justify-center py-20 px-4">
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={300}
          />
        )}

        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md text-center border border-gray-200 animate__animated animate__fadeIn">
          {/* Success GIF */}
          <img
            src="https://cdn.dribbble.com/userupload/15097592/file/original-11af0dab65a0913fe4ea1d71d9d48f4a.gif"
            alt="Payment Success"
            className="w-40 h-36 mx-auto mb-4"
          />

          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Your payment has been processed successfully. Thank you for your
            order.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            {/* Home Button */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all cursor-pointer"
            >
              <FaHome />
              Home
            </button>

            {/* Orders Button */}
            <button
              onClick={() => navigate('/MyOrders')}
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all cursor-pointer"
            >
              <FaListAlt />
              All Orders
            </button>

            {/* ⭐ Review Button */}
            <button
              onClick={() => navigate('/Review')}
              className="flex items-center justify-center gap-2 bg-yellow-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-yellow-600 transform hover:scale-105 transition-all cursor-pointer"
            >
              <FaStar />
              Give Reviews
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
