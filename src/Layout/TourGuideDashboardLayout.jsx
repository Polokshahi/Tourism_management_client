import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  FaRegNewspaper, FaClipboardList, FaPlusCircle,
  FaBars, FaTimes, FaUserTie
} from 'react-icons/fa';
import TourNest from '../Shared/TourNest/TourNest';



const TourGuideDashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const checkbox = document.getElementById("tour-guide-drawer");
    if (checkbox) checkbox.checked = !checkbox.checked;
    setIsOpen(!isOpen);
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="tour-guide-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-300 lg:hidden px-4">
          <div className="flex-none">
            <button onClick={handleToggle} className="btn text-white btn-square btn-ghost text-xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className="flex-1 text-white text-xl font-semibold">
            Tour Guide Dashboard
          </div>
        </div>

        {/* Page Content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="tour-guide-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar Content */}
          <TourNest />

          <li>
            <NavLink
              to="/tourist-dashboard/manageprofile"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold flex items-center" : "flex items-center"
              }
            >
              <FaUserTie className="mr-2" /> Manage Profile
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
              to="/dashboard/my-story"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold flex items-center" : "flex items-center"
              }
            >
              <FaRegNewspaper className="mr-2" /> Manage Stories
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TourGuideDashboardLayout;
