import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";

const AddPackage = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tourPlan, setTourPlan] = useState([{ day: "", activity: "" }]);

  const handleTourPlanChange = (index, field, value) => {
    const updated = [...tourPlan];
    updated[index][field] = value;
    setTourPlan(updated);
  };

  const addDay = () => setTourPlan([...tourPlan, { day: "", activity: "" }]);
  const removeDay = (index) => setTourPlan(tourPlan.filter((_, i) => i !== index));

  const onSubmit = async (data) => {
    const validTourPlan = tourPlan.filter(
      (item) => item.day.trim() && item.activity.trim()
    );

    if (validTourPlan.length === 0) {
      return Swal.fire(
        "Warning",
        "Please fill at least one tour plan day",
        "warning"
      );
    }

    const packageData = {
      name: user?.displayName,
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      duration: data.duration,
      location: data.location,
      images: data.photo.split(",").map((url) => url.trim()),
      tourPlan: validTourPlan,
    };

    try {
      const res = await axiosSecure.post("/packages", packageData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Package added successfully", "success");
        reset();
        setTourPlan([{ day: "", activity: "" }]);
        navigate("/all-trips");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to add package", "error");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto rounded-lg shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">Add New Tour Package</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Package Title"
          className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <input
          {...register("location", { required: true })}
          type="text"
          placeholder="Location"
          className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <input
          {...register("duration", { required: true })}
          type="text"
          placeholder="Duration (e.g., 3 days 2 nights)"
          className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <input
          {...register("price", { required: true })}
          type="number"
          step="0.01"
          placeholder="Price"
          className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <textarea
          {...register("description", { required: true })}
          placeholder="Package Description"
          className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          rows={4}
        ></textarea>
        <input
          {...register("photo", { required: true })}
          type="text"
          placeholder="Image URLs (comma separated)"
          className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />

        {/* Tour Plan Section */}
        <div className="border border-gray-300 dark:border-gray-600 p-4 rounded bg-gray-50 dark:bg-gray-700">
          <h3 className="text-lg font-semibold mb-2">
            Tour Plan <span className="text-red-500">*</span>
          </h3>
          {tourPlan.map((item, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                placeholder={`Day ${index + 1}`}
                value={item.day}
                onChange={(e) =>
                  handleTourPlanChange(index, "day", e.target.value)
                }
                className="w-full p-2 mb-1 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <textarea
                placeholder="Activity details"
                value={item.activity}
                onChange={(e) =>
                  handleTourPlanChange(index, "activity", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                rows={2}
              ></textarea>
              {tourPlan.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDay(index)}
                  className="text-red-600 dark:text-red-400 text-sm mt-1"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addDay}
            className="mt-2 text-blue-600 dark:text-blue-400 text-sm underline"
          >
            + Add another day
          </button>
        </div>

        <button
          type="submit"
          className="w-full px-2 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
