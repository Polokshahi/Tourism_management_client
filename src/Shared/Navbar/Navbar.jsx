import { Link, NavLink } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes, FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import TourNest from "../TourNest/TourNest";
import useUserRole from "../../hooks/useUserRole";
import { useDarkMode } from "../../Contexts/ThemeContext";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const { role, roleLoading } = useUserRole();
  const { darkmode, setDarkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logoutUser().catch((err) => console.log(err));
  };

  // নেভিগেশন লিঙ্কের স্টাইল ক্লাস
  const linkStyles = ({ isActive }) =>
    `relative py-1 transition-all duration-300 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-yellow-400 before:transition-all before:duration-300 hover:before:w-full ${
      isActive ? "text-yellow-400 font-bold before:w-full" : "hover:text-yellow-400"
    }`;

  const navLinks = (
    <>
      <li><NavLink to="/" onClick={() => setIsOpen(false)} className={linkStyles}>Home</NavLink></li>
      <li><NavLink to="/all-trips" onClick={() => setIsOpen(false)} className={linkStyles}>All Trips</NavLink></li>
      <li><NavLink to="/communitypage" onClick={() => setIsOpen(false)} className={linkStyles}>Community</NavLink></li>
      <li><NavLink to="/about" onClick={() => setIsOpen(false)} className={linkStyles}>About Us</NavLink></li>
    </>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b shadow-sm ${
      darkmode 
      ? "bg-gray-900/90 backdrop-blur-md text-white border-gray-800" 
      : "bg-[#07b8f3]/95 backdrop-blur-md text-white border-blue-400"
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 transform hover:scale-105 transition">
          <TourNest />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <ul className="flex gap-8 items-center list-none">
            {navLinks}
            {user && (
              <li className="relative group">
                <span className="cursor-pointer flex items-center gap-1 hover:text-yellow-400 py-2">
                  Dashboard <span className="text-[10px]">▼</span>
                </span>
                {/* Dashboard Dropdown */}
                <ul className="absolute top-full left-0 mt-0 w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 list-none p-2 border dark:border-gray-700">
                  <li><NavLink to="/dashboard" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 rounded">Tourist Dashboard</NavLink></li>
                  <li><NavLink to="/tourist-dashboard" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 rounded">Guide Dashboard</NavLink></li>
                  {!roleLoading && role === "admin" && (
                    <li><NavLink to="/dashboard-admin" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 rounded border-t dark:border-gray-600 mt-1">Admin Panel</NavLink></li>
                  )}
                </ul>
              </li>
            )}
          </ul>
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkmode)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-xl"
            title="Toggle Theme"
          >
            {darkmode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>

          {/* User Auth Section */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-white/20">
                <div className="text-right hidden lg:block">
                  <p className="text-xs opacity-80 leading-none mb-1">Welcome,</p>
                  <p className="text-sm font-bold leading-none">{user.displayName?.split(' ')[0]}</p>
                </div>
                <img
                  src={user?.photoURL || 'https://i.ibb.co/6n68K06/user.png'}
                  alt="user"
                  className="w-9 h-9 rounded-full border-2 border-yellow-400 object-cover"
                />
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-full text-xs font-bold transition shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-6 py-1.5 rounded-full font-bold transition shadow-md">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl p-1">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-64 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden shadow-2xl z-[60] ${darkmode ? "bg-gray-900" : "bg-blue-600"}`}>
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <span className="font-bold border-b-2 border-yellow-400">MENU</span>
                <FaTimes onClick={() => setIsOpen(false)} className="cursor-pointer" />
            </div>
            <ul className="flex flex-col gap-5 list-none">
                {navLinks}
                {user && (
                    <>
                        <div className="h-px bg-white/10 my-2" />
                        <li><NavLink to="/dashboard" onClick={() => setIsOpen(false)}>Tourist Dashboard</NavLink></li>
                        <li><NavLink to="/tourist-dashboard" onClick={() => setIsOpen(false)}>Guide Dashboard</NavLink></li>
                    </>
                )}
                <div className="mt-4 pt-4 border-t border-white/10">
                    {user ? (
                        <button onClick={handleLogout} className="w-full bg-red-500 py-2 rounded-lg font-bold">Logout</button>
                    ) : (
                        <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full bg-yellow-400 text-center text-blue-900 py-2 rounded-lg font-bold">Login</Link>
                    )}
                </div>
            </ul>
        </div>
      </div>
      {/* Overlay for mobile menu */}
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 md:hidden z-[55]"></div>}
    </nav>
  );
};

export default Navbar;