import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import "../../styles/ChangePassword.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangeUserPassword = () => {
  const navigate = useNavigate();
  const { User, UserPassword } = useContext(AppContext);

  // 🔹 Use logged-in email
  const email = User?.email;

  useEffect(() => {
    if (!email) {
      toast.error("Please login first!", {
        position: "top-center",
        autoClose: 3000,
        transition: Zoom,
      });
      navigate("/Login");
    }
  }, [email, navigate]);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const formHandler = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !confirmPassword) {
      toast.error("Please fill all fields!", {
        position: "top-center",
        autoClose: 3000,
        transition: Zoom,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-center",
        autoClose: 3000,
        transition: Zoom,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await UserPassword({ email, oldPassword, password });
      if (response.success) {
        toast.success(response.message || "✅ Password changed successfully!", {
          position: "top-center",
          autoClose: 3000,
          transition: Zoom,
        });
        navigate("/Login");
      } else {
        toast.error(response.message || "⚠️ Failed to change password.", {
          position: "top-center",
          autoClose: 3000,
          transition: Zoom,
        });
      }
    } catch (err) {
      console.error("Change Password Error:", err);
      toast.error("Something went wrong! Try again later.", {
        position: "top-center",
        autoClose: 3000,
        transition: Zoom,
      });
    }

    setLoading(false);
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
            Set a new password for your account.
          </p>

          <form onSubmit={formHandler}>
            <h1 className="label">Old Password:</h1>
            <div className="input-grouping">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Enter Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="input-field"
                required
              />
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

export default ChangeUserPassword;
