import React, { useContext, useState } from "react";
import "../../Styles/Register.css";
import Footer from "../Footer";
import Navbar from "../Navbar";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false); // ✅ Terms checkbox
  const navigate = useNavigate();

  const { register } = useContext(AppContext);

  const formHandler = async (e) => {
    e.preventDefault();

    if (!agree) {
      alert("Please accept the Terms & Conditions before signing up.");
      return;
    }

    console.log({ name, email, password });

    try {
      const response = await register(name, email, password);
      const isSuccess =
        response?.success === true || response?.success === "true";

      if (isSuccess) {
        console.log("Register Successfully!!");
        navigate("/Login");
      } else {
        console.log("Registration failed!");
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
    }
  };

  return (
    <>
      <Navbar />

      {/* Banner Section */}
      <section className="register-hero relative flex items-center justify-center">
        <div className="hero-content text-center relative z-10">
          <h1 className="title">Register</h1>
          <p className="subtitle">
            <a
              href="#"
              className="home opacity-80 hover:opacity-100 cursor-pointer"
            >
              Home
            </a>
            <span className="mx-3">&gt;</span>
            <span className="font-medium">Register</span>
          </p>
        </div>
      </section>

      {/* Register Section */}
      <div className="min-h-screen flex items-center justify-center register">
        <div className="register-card">
          <h2 className="text-center heading">Create an Account</h2>
          <p className="text-center sub-heading">
            Please Fill your Details to Sign Up.
          </p>

          <form onSubmit={formHandler}>
            <h1 className="labels">Name:</h1>
            <div className="input-group">
              <i className="fa fa-user"></i>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <h1 className="labels">E-Mail:</h1>
            <div className="input-group">
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

            <h1 className="labels">Password:</h1>
            <div className="input-group">
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

            <h1 className="labels">Confirm Password:</h1>
            <div className="input-group">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>

            {/* Terms and Conditions + Privacy Policy Checkbox */}
            <div className="terms-box">
              <input
                type="checkbox"
                id="terms"
                checked={agree}
                onChange={() => setAgree(!agree)}
                required
              />
              <label htmlFor="terms">
                I agree to the{" "}
                <a href="/TermsAndCondition" className="terms-link">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/PrivacyAndPolicy" className="terms-link">
                  Privacy Policy
                </a>
              </label>
            </div>


            <button type="submit" className="signup-btn w-full">
              Sign up
            </button>
          </form>

          <p className="text-center footer-text">
            Already have an account?{" "}
            <a href="/Login" className="signup-link">
              Log In
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Register;
