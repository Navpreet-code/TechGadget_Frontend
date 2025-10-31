import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Carts = () => {
  const { cartItems, AddtoCart, DecreaseQty, RemoveCart, ClearCart } = useContext(AppContext);
  const [Quantity, SetQuantity] = useState(0);
  const [Price, SetPrice] = useState(0);
  const navigate = useNavigate();

  const handleCheckout = () => { 
    {
      navigate("/Address");
    }
  };

useEffect(() => {
  let Quantity = 0;
  let Price = 0;

  if (cartItems && cartItems.length > 0) {
    for (let i = 0; i < cartItems.length; i++) {
      Quantity += cartItems[i].Quantity;
      Price += cartItems[i].Price;
    }
  }

  SetQuantity(Quantity);
  SetPrice(Price);
}, [cartItems]);


  return (
    <>
      <Navbar />

      {/* Banner Section */}
      <section className="banner relative flex items-center justify-center">
        <div className="banner-content text-center relative z-10">
          <h1 className="head">Cart</h1>
          <p className="subhead">
            <a href="#" className="Home opacity-80 hover:opacity-100 cursor-pointer">
              Home
            </a>
            <span className="mx-3">&gt;</span>
            <span className="font-medium">Cart</span>
          </p>
        </div>
      </section>

{/* Cart Summary Section */}
{cartItems && cartItems.length > 0 && (
  <div className="max-w-6xl mx-auto m-5 px-2">
    <div className="bg-gray-300 border border-black rounded-2xl shadow-sm shadow-[#262524] 
                    p-3 flex flex-row items-center justify-between gap-8">
      
      {/* Summary Info */}
      <div className="flex flex-row items-center gap-6 p-1">
        {/* Total Items */}
        <div className="flex items-center gap-2">
          <p className="text-gray-700 text-base font-medium">Total Quantity:</p>
          <h2 className="text-lg font-bold text-gray-900">{Quantity}</h2>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-black"></div>

        {/* Total Price */}
        <div className="flex items-center gap-2">
          <p className="text-gray-700 text-base font-medium">Total Price:</p>
          <h2 className="text-lg font-bold text-green-700">₹{Price}</h2>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row gap-4">
        {/* Clear Cart Button */}
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to clear the entire cart?")) {
              ClearCart();
            }
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md cursor-pointer"
        >
          Clear Cart
        </button>

        {/* Checkout Button */}
         <button
      onClick={handleCheckout}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-md cursor-pointer"
    >
      Checkout
    </button>
      </div>
    </div>
  </div>
)}

      {/* Cart Items */}
      <div className="max-w-6xl mx-auto py-8 px-4 space-y-6">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.ProductId}
              className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* LEFT SIDE - IMAGE */}
              <div className="md:w-1/4 flex justify-center items-center bg-gray-50 p-4">
                <img
                  src={item.Image}
                  alt={item.Title}
                  className="w-full h-32 object-contain rounded-xl"
                />
              </div>

              {/* RIGHT SIDE - DETAILS */}
              <div className="md:w-3/4 p-4 flex flex-col justify-between">
                {/* TITLE + PRICE */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{item.Title}</h2>
                  <p className="text-green-600 font-bold text-lg">
                    ₹{item.Price}
                  </p>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-700 text-sm mt-2 line-clamp-2">
                  {item.Description}
                </p>

                {/* QUANTITY */}
                <p className="text-gray-700 font-medium mt-2">
                  Quantity: {item.Quantity}
                </p>

                {/* BUTTONS */}
                <div className="flex items-center mt-3 gap-3">
                  <button
                    onClick={() => DecreaseQty(item?.ProductId, 1)}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full text-lg font-bold cursor-pointer"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    value={item.Quantity}
                    readOnly
                    className="w-16 text-center border rounded-lg py-1"
                  />

                  <button
                    onClick={() =>
                      AddtoCart(
                        item?.ProductId,
                        item?.Title,
                        item?.Price / item?.Quantity,
                        1,
                        item?.Image
                      )
                    }
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full text-lg font-bold cursor-pointer"
                  >
                    +
                  </button>

                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to remove this item from the cart?"
                        )
                      ) {
                        RemoveCart(item.ProductId);
                      }
                    }}
                    className="ml-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">
            Your cart is empty 🛒
          </p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Carts;
