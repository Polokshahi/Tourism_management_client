import { useState, useEffect } from "react";
import useAxios from "../../../../hooks/useAxios";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router";

const OurPackages = () => {
  const axiosSecure = useAxios();
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    axiosSecure
      .get("/packages/random/3")
      .then((res) => setPackages(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-8 grid md:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div
          key={pkg._id}
          className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300
          bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800"
        >
          <div className="overflow-hidden">
            <img
              src={pkg.images}
              alt={pkg.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
            />
          </div>

          <div className="p-5 space-y-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {pkg.title}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Location: {pkg.location}
            </p>

            <p className="text-indigo-600 dark:text-indigo-400 font-bold">
              ${pkg.price}
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelectedPackage(pkg)}
                className="flex-1 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition"
              >
                View
              </button>

              <NavLink to={`/packages/${pkg._id}`} className="flex-1">
                <button className="w-full px-3 py-2 rounded-xl border border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white text-sm font-medium transition">
                  Details
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      ))}

      {/* MODAL */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl
          bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700">

            {/* Close */}
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute right-4 top-4 text-red-500 hover:text-red-600 text-lg"
            >
              <FaTimes />
            </button>

            <img
              src={selectedPackage.images}
              className="w-full h-52 object-cover"
              alt=""
            />

            <div className="p-6 space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedPackage.title}
              </h2>

              <p className="text-gray-500 dark:text-gray-400">
                <b>Location:</b> {selectedPackage.location}
              </p>

              <p className="text-gray-500 dark:text-gray-400">
                <b>Duration:</b> {selectedPackage.duration}
              </p>

              <p className="text-indigo-600 dark:text-indigo-400 font-bold">
                ${selectedPackage.price}
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-6">
                {selectedPackage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------- GUIDES ---------------- */

const MeetOurTourGuides = () => {
  const axiosSecure = useAxios();
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/guides/random/6")
      .then((res) => setGuides(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-8 grid md:grid-cols-3 gap-6">
      {guides.map((guide) => (
        <div
          key={guide._id}
          className="text-center p-6 rounded-2xl shadow-md hover:shadow-xl transition
          bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800"
        >
          <img
            src={guide.image}
            alt={guide.name}
            className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-indigo-500"
          />

          <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
            {guide.name}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {guide.reason}
          </p>

          <NavLink to="/dashboard/manageprofile">
            <button className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition">
              View Profile
            </button>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

/* ---------------- TABS ---------------- */

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState("packages");

  return (
    <div className="max-w-7xl mx-auto px-4 my-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Tourism & Travel Guide
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-8 border-b border-gray-300 dark:border-slate-700">
        {["packages", "guides"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-semibold transition ${
              activeTab === tab
                ? "border-b-4 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-gray-400 hover:text-indigo-500"
            }`}
          >
            {tab === "packages" ? "Our Packages" : "Tour Guides"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === "packages" && <OurPackages />}
        {activeTab === "guides" && <MeetOurTourGuides />}
      </div>
    </div>
  );
};

export default TabsComponent;