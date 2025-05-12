
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-violet-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h1 className="text-2xl font-bold mb-4">ResQMap</h1>
          <p className="text-sm text-gray-300">Empowering communities with real-time disaster reporting and resource support.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/user" className="hover:underline">Home</Link></li>
            <li><Link to="/user/report-disaster" className="hover:underline">Report Disaster</Link></li>
            <li><Link to="/user/request-resource" className="hover:underline">Request Help</Link></li>
            <li><Link to="/user/analytics" className="hover:underline">Analytics</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact</h2>
          <p className="text-sm">Email: support@resqmap.tech</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
          <p className="text-sm">Address: New Delhi, India</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4 text-white text-xl">
            <a href="https://www.facebook.com/hameedkhan008"><FaFacebook /></a>
            <a href="https://x.com/hameed_khan008"><FaTwitter /></a>
            <a href="https://www.linkedin.com/in/hameed008/"><FaLinkedin /></a>
            <a href="https://www.instagram.com/hameed_khan008/"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="text-center py-4  border-t border-violet-700 text-sm text-gray-300">
        &copy; {new Date().getFullYear()} ResQMap. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
