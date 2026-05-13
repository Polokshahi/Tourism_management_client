import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';

import {
  FaPlusCircle, FaBook, FaClipboardList, FaRegNewspaper, FaGlobeAsia,
  FaTimes,
  FaBars
} from 'react-icons/fa';

import TourNest from '../Shared/TourNest/TourNest';

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const checkbox = document.getElementById("my-drawer-2");
    if (checkbox) checkbox.checked = !checkbox.checked;
    setIsOpen(!isOpen);
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 lg:hidden px-4">
          <div className="flex-none">
            <button onClick={handleToggle} className="btn text-white btn-square btn-ghost text-xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className="flex-1 text-white  text-xl font-semibold ">
            Dashboard
          </div>
        </div>
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content */}
          <TourNest></TourNest>

          <li>
            <NavLink
              to="/dashboard/manageprofile"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold flex items-center" : "flex items-center"
              }
            >
              <FaRegNewspaper className="mr-2" /> Manage Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/my-bookings"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold flex items-center" : "flex items-center"
              }
            >
              <FaClipboardList className="mr-2" /> My Bookings
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/my-story"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold flex items-center" : "flex items-center"
              }
            >
              <FaRegNewspaper className="mr-2" /> Manage Stories
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/add-story"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold flex items-center" : "flex items-center"
              }
            >
              <FaPlusCircle className="mr-2" /> Add Story
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/join-as-guide"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold flex items-center" : "flex items-center"
              }
            >
              <FaGlobeAsia className="mr-2" /> Join as tour guide
            </NavLink>
          </li>

          <li>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
