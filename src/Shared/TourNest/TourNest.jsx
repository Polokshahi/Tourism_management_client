import React from 'react';
import logo from '/images.png'; 
import { Link } from 'react-router'; 

const TourNest = () => {
  return (
    <div>
      <Link to="/" className="group flex items-center gap-2 transition-all">
        {/* লোগো ইমেজ - হোভার করলে হালকা রোটেট হবে */}
        <div className="relative overflow-hidden rounded-full border-2 border-yellow-400 group-hover:rotate-12 transition-transform duration-300">
          <img 
            className="h-10 w-10 object-cover" 
            src={logo} 
            alt="TourNest Logo" 
          />
        </div>

        {/* ব্র্যান্ড নাম */}
        <div className="flex flex-col leading-none">
          <p className="text-2xl font-black tracking-tighter text-[#443dff] dark:text-white uppercase">
            Tour <span className="text-yellow-400">24/7</span>
          </p>
          <span className="text-[10px] font-bold tracking-[0.2em] text-white dark:text-gray-400 uppercase">
            Explore the world
          </span>
        </div>
      </Link>
    </div>
  );
};

export default TourNest;