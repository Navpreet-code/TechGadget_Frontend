import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import "../../Styles/ChangePassword.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ChangePassword, Forgot } = useContext(AppContext);

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Timer for resend OTP
  const [timer, setTimer] = useState(0);

  // Countdown effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // 🔹 Handle password change
  const formHandler = async (e) => {
    e.preventDefault();

    if (!otp || !password || !confirmPassword) {
      alert("Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await ChangePassword({ email, otp_code: otp, password });
      console.log("ChangePassword response:", response);

      if (response && response.success) {
        alert(response.message || "✅ Password changed successfully!");
        navigate("/Login");
      } else {
        alert(response.message || "⚠️ Invalid OTP or failed to change password.");
      }
    } catch (err) {
      console.error("Change Password Error:", err);
      alert("Something went wrong! Try again later.");
    }

    setLoading(false);
  };

  // 🔹 Resend OTP function
  const resendOTP = async () => {
    if (timer > 0) return;

    try {
      const response = await Forgot(email);
      console.log("Resend OTP response:", response);

      if (response && response.success) {
        alert("✅ OTP resent successfully!");
        setTimer(30); // start cooldown timer
      } else {
        alert(response.message || "⚠️ Unable to resend OTP.");
      }
    } catch (err) {
      console.error("Resend OTP Error:", err);
      alert("Server error while resending OTP.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="banner relative flex items-center justify-center">
        <div className="banner-content text-center relative z-10">
          <h1 className="head">Change Password</h1>
          <p className="subhead">
            <a href="/" className="Home opacity-80 hover:opacity-100 cursor-pointer">
              Home
            </a>
            <span className="mx-3">&gt;</span>
            <span className="font-medium">Change Password</span>
          </p>
        </div>
      </section>

      <div className="min-h-screen flex items-center justify-center login-bg">
        <div className="ChangePass-card">
          <h2 className="text-center card-heading">Change Password</h2>
          <p className="text-center card-sub-heading">
            Enter the OTP sent to your email and set a new password.
          </p>

          <form onSubmit={formHandler}>
            <h1 className="label">OTP:</h1>
            <div className="input-grouping">
              <i className="fa fa-key"></i>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input-field"
                required
              />
            </div>

            {/* 🔹 Resend OTP section */}
            <div className="text-right mt-1 mb-3">
              <button
                type="button"
                onClick={resendOTP}
                disabled={timer > 0}
                className={`text-blue-600 hover:text-blue-800 text-sm font-medium ${
                  timer > 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
              </button>
            </div>

            <h1 className="label">New Password:</h1>
            <div className="input-grouping">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <h1 className="label">Confirm Password:</h1>
            <div className="input-grouping">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="login-btn w-full" disabled={loading}>
              {loading ? "Updating..." : "Change Password"}
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

export default ChangePassword;
