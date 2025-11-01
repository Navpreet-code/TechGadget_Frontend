import React, { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import "../../Styles/Login.css";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  const formhandler = async (e) => {
    e.preventDefault();
    console.log({ email, password });

    try {
      const response = await login(email, password); // call your login API

      if (response.success && response.token) {
        console.log("Login Successfully!!");
        navigate("/"); 
      } else {
        console.log("Login failed:", response.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error! Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      {/* Banner Section */}
      <section className="banner relative flex items-center justify-center">
        <div className="banner-content text-center relative z-10">
          <h1 className="head">Login</h1>
          <p className="subhead">
            <a href="#" className="Home opacity-80 hover:opacity-100 cursor-pointer">
              Home
            </a>
            <span className="mx-3">&gt;</span>
            <span className="font-medium">Login</span>
          </p>
        </div>
      </section>

      {/* Login Form Section */}
      <div className="min-h-screen flex items-center justify-center login-bg">
        <div className="login-card">
          <h2 className="text-center card-heading">Welcome Back</h2>
          <p className="text-center card-sub-heading">
            Please Enter your details to sign In.
          </p>

          <form onSubmit={formhandler}>
            <h1 className="label">E-Mail:</h1>
            <div className="input-grouping">
              <i className="fa fa-envelope"></i>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <h1 className="label">Password:</h1>
            <div className="input-grouping">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="flex justify-end mb-6 w-full">
              <a href="ForgetPassword" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-btn w-full">
              Sign In
            </button>
          </form>

          <p className="text-center footer-down">
            Don't have an Account yet?{" "}
            <a href="Register" className="login-link">
              SignUp
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
