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
    <div className="mt-6 grid md:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div
          key={pkg._id}
          className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition"
        >
          <img
            src={pkg.images}
            alt={pkg.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 space-y-2">
            <h3 className="text-xl text-black font-semibold">{pkg.title}</h3>
            <p className="text-sm text-gray-600">Location: {pkg.location}</p>
            <p className="text-green-600 font-bold">Price: {pkg.price}</p>
            <div className="flex justify-between">
              <button
                onClick={() => setSelectedPackage(pkg)}
                className="px-4 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                View Details
              </button>
              <NavLink to={`/packages/${pkg._id}`}>
                <button className="px-4 py-1 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition">
                  Package Details
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-lg relative">
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-2 right-2 text-red-500 text-xl"
            >
              <FaTimes />
            </button>
            <img
              src={selectedPackage.images}
              alt={selectedPackage.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl text-black font-bold mb-2">
              {selectedPackage.title}
            </h2>
            <p className="text-gray-700 mb-1">
              <strong>Location:</strong> {selectedPackage.location}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Duration:</strong> {selectedPackage.duration}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Price:</strong> ${selectedPackage.price}
            </p>
            <p className="text-gray-600 mt-3">{selectedPackage.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

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
    <div className="mt-6 grid md:grid-cols-3 gap-6">
      {guides.map((guide) => (
        <div
          key={guide._id}
          className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center"
        >
          <img
            src={guide.image}
            alt={guide.name}
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl text-black font-semibold">{guide.name}</h3>
          <p className="text-gray-600">{guide.reason} </p>
          <NavLink to='/dashboard/manageprofile'>
            <button className="mt-3 bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded">
              View Profile
            </button>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState("packages");

  return (
    <div className="max-w-7xl mx-auto px-4 my-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        Tourism and Travel Guide
      </h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 border-b-2 border-gray-300">
        <button
          onClick={() => setActiveTab("packages")}
          className={`pb-3 font-semibold ${activeTab === "packages"
            ? "border-b-4 border-indigo-600 text-indigo-600"
            : "text-gray-600 hover:text-indigo-600"
            }`}
        >
          Our Packages
        </button>
        <button
          onClick={() => setActiveTab("guides")}
          className={`pb-3 font-semibold ${activeTab === "guides"
            ? "border-b-4 border-indigo-600 text-indigo-600"
            : "text-gray-600 hover:text-indigo-600"
            }`}
        >
          Meet Our Tour Guides
        </button>
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
