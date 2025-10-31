import React from "react";
import { Link } from "react-router-dom"; // ✅ Added for navigation
import "../Styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Grid Container */}
      <div className="footer-container max-w-9xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Logo + Contact */}
        <div className="footer-section">
          <h1 className="footer-logo">Tech Gadgets</h1>
          <p className="flex items-center Location">
            <img src="/assets/Location.png" alt="Location" />
            184 Main Rd E, St Albans VIC 3021, Australia
          </p>
          <p className="flex items-center gap-2 Email">
            <img src="/assets/Mail.png" alt="Email" />
            contact@company.com
          </p>
          <p className="flex items-center gap-2 Phone">
            <img src="/assets/Phone.png" alt="Phone" />
            +001 2233 456
          </p>

          {/* Social Icons */}
          <div className="social-icons flex gap-4 mt-3">
            <a href="#"><img src="/assets/Facebook.png" alt="Facebook" /></a>
            <a href="#"><img src="/assets/instagram.png" alt="Instagram" /></a>
            <a href="#"><img src="/assets/LinkedIn.png" alt="LinkedIn" /></a>
            <a href="#"><img src="/assets/Youtube.png" alt="YouTube" /></a>
          </div>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3>Categories</h3>
          <ul className="space-y-2">
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/accessories">Accessories</Link></li>
            <li><Link to="/shoes">Shoes</Link></li>
            <li><Link to="/denim">Denim</Link></li>
            <li><Link to="/dress">Dress</Link></li>
          </ul>
        </div>

        {/* Information */}
        <div className="footer-section">
          <h3>Information</h3>
          <ul className="space-y-2">
            <li><Link to="/AboutUs">About Us</Link></li>
            <li><Link to="/Contact">Contact Us</Link></li>
            <li><Link to="/TermsAndCondition">Terms & Conditions</Link></li>
            <li><Link to="/returns">Returns & Exchanges</Link></li>
            <li><Link to="/shipping">Shipping & Delivery</Link></li>
            <li><Link to="/PrivacyAndPolicy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="footer-section">
          <h3>Useful Links</h3>
          <ul className="space-y-2">
            <li><Link to="/store">Store Location</Link></li>
            <li><Link to="/news">Latest News</Link></li>
            <li><Link to="/account">My Account</Link></li>
            <li><Link to="/size-guide">Size Guide</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe to our newsletter and get 10% off your first purchase.</p>
          <div className="subscribe-box">
            <input type="email" placeholder="Your Email address" />
            <button>Subscribe</button>
          </div>

          {/* Payment Icons */}
          <div className="payment-icons flex gap-3">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" />
            <img src="https://img.icons8.com/color/48/paypal.png" alt="Paypal" />
            <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="Mastercard" />
            <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" />
            <img src="https://img.icons8.com/color/48/discover.png" alt="Discover" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom mt-10 flex flex-col md:flex-row justify-between items-center px-6">
        <p>© 2025 <span className="blue">Tech Gadgets</span> Store.</p>
        <div className="footer-links flex gap-4 mt-2 md:mt-0">
          <Link to="/shop">Shop</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/blog">Blog</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
