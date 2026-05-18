import React from 'react';
import { Link } from 'react-router';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Tour<span className="text-sky-500 gap-0.5">24/7</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Transforming travel into unforgettable journeys through expert management and a customer-first approach. 
              Your gateway to authentic global experiences.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <FaFacebookF />, link: "https://www.facebook.com/Nameispoloks.9/" },
                { icon: <FaInstagram />, link: "https://www.instagram.com/nameispolok/" },
                { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/polok-shahi-44b9a91aa/"},

              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors duration-300 text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:ml-auto">
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-sky-400 transition-colors">Home</Link></li>
              <li><Link to="/all-trips" className="hover:text-sky-400 transition-colors">All Destinations</Link></li>
              <li><Link to="/about" className="hover:text-sky-400 transition-colors">Our Story</Link></li>
              <li><Link to="/dashboard" className="hover:text-sky-400 transition-colors">Management Portal</Link></li>
            </ul>
          </div>

          {/* Office Information */}
          <div className="lg:ml-auto">
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Connect</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-sky-500 mt-1" />
                <span className="text-slate-400">Bogura Sadar, Bogura, <br />Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-sky-500" />
                <a href="tel:+8801718175422" className="hover:text-white">+8801718175422</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-sky-500" />
                <a href="mailto:polokshahi2@gmail.com" className="hover:text-white">polokshahi2@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Lead Gen / Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase text-xs tracking-widest">Stay Updated</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Subscribe to receive exclusive travel deals and agency updates.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:border-sky-500 text-sm"
              />
              <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-r-md transition-colors text-sm font-bold">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Attribution */}
        <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Tour 24/7 Tourism Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
          <p>Managed by <span className="text-slate-300">Md. Abdulla Hel Shahi</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;