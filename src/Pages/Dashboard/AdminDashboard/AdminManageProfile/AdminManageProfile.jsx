import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AdminManageProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", photo: "", phone: "", address: "" });

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    }
  });

  const { data: profile = {}, refetch } = useQuery({
    queryKey: ["admin-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    }
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(`/users/${profile._id}`, formData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Profile updated successfully", "success");
        setIsModalOpen(false);
        refetch();
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">Welcome, {profile.name}!</h2>

      {/* 🔢 Admin Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Payment" value={`$${stats.totalPayment || 0}`} />
        <StatCard title="Total Tour Guides" value={stats.totalTourGuides || 0} />
        <StatCard title="Total Packages" value={stats.totalPackages || 0} />
        <StatCard title="Total Clients" value={stats.totalClients || 0} />
        <StatCard title="Total Stories" value={stats.totalStories || 0} />
      </div>

      {/* 👤 Admin Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-xl transition-colors duration-500">
        <div className="flex items-center gap-4">
          <img
            src={profile.photo}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profile.name}</h3>
            <p className="text-gray-800 dark:text-gray-200">Email: {profile.email}</p>
            <p className="text-gray-800 dark:text-gray-200">Phone: {profile.phone || "N/A"}</p>
            <p className="text-gray-800 dark:text-gray-200">Address: {profile.address || "N/A"}</p>
            <p className="text-blue-500 font-semibold">Role: {profile.role}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setFormData({
              name: profile.name,
              photo: profile.photo,
              phone: profile.phone || "",
              address: profile.address || "",
            });
            setIsModalOpen(true);
          }}
          className="mt-4 btn btn-primary"
        >
          Edit Profile
        </button>
      </div>

      {/* ✏️ Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-lg transition-colors duration-500">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Edit Profile</h2>
            <form onSubmit={handleUpdate} className="grid gap-4">
              <input
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name"
                required
              />
              <input
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                type="text"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                placeholder="Photo URL"
                required
              />
              <input
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone"
              />
              <input
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Address"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button type="submit" className="btn btn-success">Save</button>
                <button onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-6 shadow transition-colors duration-500">
    <h4 className="text-lg font-semibold">{title}</h4>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default AdminManageProfile;
