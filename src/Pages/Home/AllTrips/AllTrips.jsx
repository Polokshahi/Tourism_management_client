import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { FaTimes } from "react-icons/fa";

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        All Trips
      </h2>

      {/* 🔎 Search Box */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search trips..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#443dff]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 transition duration-300"
          >
            <img
              src={pkg.images?.[0]}
              alt={pkg.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-3 text-gray-900 dark:text-white">
              {pkg.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">📍 {pkg.location}</p>
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              ৳ {pkg.price}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{pkg.duration}</p>

            <div className="flex space-x-2 mt-3">
              {/* View Details button (modal) */}
              <button
                onClick={() => setSelectedPackage(pkg)}
                className="px-4 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                View Details
              </button>

              {/* Direct link button */}
              <a
                href={`/packages/${pkg._id}`}
                className="px-4 py-1 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
              >
                Package Details
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-[90%] max-w-lg relative shadow-xl">
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-3 right-3 text-red-500 text-xl"
            >
              <FaTimes />
            </button>
            <img
              src={selectedPackage.images?.[0]}
              alt={selectedPackage.title}
              className="w-full h-56 md:h-64 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-black dark:text-white">
              {selectedPackage.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <strong>Location:</strong> {selectedPackage.location}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <strong>Duration:</strong> {selectedPackage.duration}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <strong>Price:</strong> ৳ {selectedPackage.price}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-3">
              {selectedPackage.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTrips;
