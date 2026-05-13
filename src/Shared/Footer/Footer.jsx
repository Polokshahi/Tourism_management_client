import React from 'react';
import {
  FaFacebook,
  FaSquareInstagram,
  FaLinkedin,
  FaYoutube
} from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Tourism Management</h3>
            <p className="text-sm text-gray-300">
              Explore your dream destinations with our expert travel services. Safe, secure, and unforgettable experiences.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-4 text-2xl">
              <a href="https://www.facebook.com/TopanRoy41105/" target="_blank" rel="noopener noreferrer">
                <FaFacebook color="blue" />
              </a>
              <a href="https://www.instagram.com/topan_roy41105/?igsh=dWdpYmUxcDNuZnhz#" target="_blank" rel="noopener noreferrer">
                <FaSquareInstagram color="red" />
              </a>
              <a href="https://www.linkedin.com/in/topanroy/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin color="blue" />
              </a>
              <a href="https://www.youtube.com/@Topanroy-t5q" target="_blank" rel="noopener noreferrer">
                <FaYoutube color="red" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/all-trips" className="hover:text-white">all-trips</a></li>
              <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <p className="text-gray-300 text-sm">Phone: +880 1706541105</p>
            <p className="text-gray-300 text-sm">Email: roytopan734@gmail.com
</p>
            <p className="text-gray-300 text-sm">Location: Birgonj, Dinajpur</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-gray-400 text-sm mt-10 border-t pt-5 border-gray-700">
          &copy; {new Date().getFullYear()} Tourism Management | Developed by Topan Roy
        </div>
      </div>
    </footer>
  );
};

export default Footer;
