import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { FaTimes, FaSearch, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const AllTrips = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const axiosPublic = useAxios();

  useEffect(() => {
    axiosPublic.get("/packages").then((res) => {
      const sorted = res.data.sort((a, b) => b.price - a.price);
      setPackages(sorted);
    });
  }, [axiosPublic]);

  const filteredPackages = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Discover Your Next <span className="text-indigo-600 dark:text-indigo-400">Adventure</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Browse through our curated packages crafted for unforgettable memories.
        </p>
      </div>

      {/* 🔎 Modern Search Box */}
      <div className="mb-12 flex justify-center">
        <div className="relative w-full sm:w-1/2 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search destination or trip name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg._id}
            className="group flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Image Container with Hover Zoom & Price Tag */}
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src={pkg.images?.[0]}
                alt={pkg.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                  ৳{pkg.price}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-indigo-500" /> {pkg.location}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock className="text-indigo-500" /> {pkg.duration}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 mb-4">
                {pkg.title}
              </h3>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-auto pt-2">
                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className="w-full py-2.5 px-4 text-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Quick View
                </button>
                <a
                  href={`/packages/${pkg._id}`}
                  className="w-full py-2.5 px-4 text-center rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 shadow-sm shadow-indigo-200 dark:shadow-none transition"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPackages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No trips found matching "{searchTerm}"</p>
        </div>
      )}

      {/* Premium Backdrop Blur Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl w-full max-w-lg relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full transition"
            >
              <FaTimes />
            </button>
            
            <img
              src={selectedPackage.images?.[0]}
              alt={selectedPackage.title}
              className="w-full h-56 md:h-64 object-cover rounded-xl mb-6 shadow-inner"
            />
            
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900 dark:text-white">
              {selectedPackage.title}
            </h2>

            <div className="grid grid-cols-3 gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl mb-6 text-sm">
              <div className="text-center">
                <span className="block text-xs text-gray-400 uppercase font-medium">Location</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedPackage.location}</span>
              </div>
              <div className="text-center border-x border-gray-200 dark:border-gray-700">
                <span className="block text-xs text-gray-400 uppercase font-medium">Duration</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedPackage.duration}</span>
              </div>
              <div className="text-center">
                <span className="block text-xs text-gray-400 uppercase font-medium">Price</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">৳{selectedPackage.price}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-xs text-gray-400 uppercase font-medium">Overview</span>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                {selectedPackage.description || "No description provided for this premium travel package details area."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTrips;