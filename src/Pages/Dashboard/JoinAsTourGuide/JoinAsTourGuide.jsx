import { useState } from "react";
import Swal from "sweetalert2";

import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const JoinAsTourGuide = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    cvLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const application = {
      ...formData,
      email: user.email,
      name: user.displayName,
      image: user.photoURL,
      status: "pending",
      appliedAt: new Date(),
    };

    try {
      await axiosSecure.post("/guides", application);
      Swal.fire("Application Submitted!", "We will review soon.", "success");
      setFormData({ title: "", reason: "", cvLink: "" });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 rounded shadow my-10 bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        Apply to Join as a Tour Guide
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Application Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white text-black dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 transition-colors duration-500"
            placeholder="e.g., Passionate Travel Enthusiast"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Why do you want to be a Tour Guide?
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full bg-white text-black dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 transition-colors duration-500"
            rows={4}
            placeholder="Describe your motivation and passion..."
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">CV / Resume Link</label>
          <input
            type="url"
            name="cvLink"
            value={formData.cvLink}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white text-black dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 transition-colors duration-500"
            placeholder="https://drive.google.com/your-cv"
          />
        </div>

        <div className="text-center">
          <button className="px-2 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinAsTourGuide;
