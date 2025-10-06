import React from "react";
import "../styles/Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Cartify</h2>
          <p>Your trusted shopping partner for everything you love.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>


        <div className="footer-links">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/support">Help Center</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
          <h3>We Accept</h3>
          <div className="payment-icons">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>@ 2025 Cartify. All rights reserved.</p>
      </div>
    </footer>
  );
}


