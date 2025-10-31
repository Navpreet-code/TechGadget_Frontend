import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import "../../Styles/Forget.css";
import Footer from "../Footer";
import Navbar from "../Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { Forgot } = useContext(AppContext);
  const navigate = useNavigate();

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await Forgot(email);
      console.log("Forgot response:", response);

      if (response && response.success) {
        alert(response.message || " OTP sent successfully!");
        navigate("/ChangePassword", { state: { email } });
      } else {
        alert(response.message || " Unable to send OTP. Try again!");
      }
    } catch (err) {
      console.error("Forgot Password Error:", err);
      alert("Something went wrong! Try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="banner relative flex items-center justify-center">
        <div className="banner-content text-center relative z-10">
          <h1 className="head">Forgot Password</h1>
          <p className="subhead">
            <a href="/" className="Home opacity-80 hover:opacity-100 cursor-pointer">
              Home
            </a>
            <span className="mx-3">&gt;</span>
            <span className="font-medium">Forgot Password</span>
          </p>
        </div>
      </section>

      <div className="min-h-screen flex items-center justify-center login-bg">
        <div className="forget-card">
          <h2 className="text-center card-heading">Forgot Password</h2>
          <p className="text-center card-sub-heading">
            Enter your registered email to receive an OTP.
          </p>

          <form onSubmit={formHandler}>
            <h1 className="label">E-Mail:</h1>
            <div className="input-grouping">
              <i className="fa fa-envelope"></i>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="login-btn w-full">
              Send OTP
            </button>
          </form>

          <p className="text-center footer-down">
            Back to <a href="/Login" className="login-link">Login</a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ForgotPassword;
