import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";

const ManageProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.displayName || "",
    photo: user?.photoURL || "",
  });

  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setDbUser(res.data);
      });
    }
  }, [user, axiosSecure]);

  const handleEditOpen = () => setIsModalOpen(true);
  const handleEditClose = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(editData.name, editData.photo);
      await axiosSecure.patch(`/users/${user.email}`, {
        name: editData.name,
        photo: editData.photo,
      });
      const res = await axiosSecure.get(`/users/${user.email}`);
      setDbUser(res.data);

      Swal.fire({
        icon: "success",
        title: "Profile Updated Successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      handleEditClose();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-black text-black dark:text-white rounded-xl shadow-md transition-colors duration-500">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600 dark:text-teal-400">
        Welcome, {user?.displayName}!
      </h2>

      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <p className="text-lg font-medium mb-1">Name: {user?.displayName}</p>
        <p className="mb-1">Email: {user?.email}</p>
        <p className="mb-4">
          Role: <strong className="capitalize">{dbUser?.role || "tourist"}</strong>
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleEditOpen}
            className="px-2 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={() => navigate("/dashboard/join-as-guide")}
            className="px-2  rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            Apply As Tour Guide
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-black text-black dark:text-white rounded-lg p-6 w-full max-w-md transition-colors duration-500">
            <h3 className="text-3xl font-bold text-center mb-6 text-indigo-700">Edit Profile</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-200 text-black dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  value={editData.photo}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-200 text-black dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email}
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  value={dbUser?.role || "tourist"}
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed capitalize"
                  disabled
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleEditClose}
                  className="px-2  rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-2 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfile;
