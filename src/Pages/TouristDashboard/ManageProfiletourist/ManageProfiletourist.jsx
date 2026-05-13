import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const ManageProfiletourist = () => {
  const { user, updateUserProfile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || '');
  const [photo, setPhoto] = useState(user?.photoURL || '');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(name, photo);
      Swal.fire('Success', 'Profile updated successfully', 'success');
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Failed to update profile', 'error');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">👋 Welcome, {user?.displayName}</h2>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center space-y-4 transition-colors duration-500">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover"
        />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{user?.displayName}</h3>
        <p className="text-gray-800 dark:text-gray-200"><strong>Email:</strong> {user?.email}</p>
        <p className="text-gray-800 dark:text-gray-200"><strong>Role:</strong> {user?.role}</p>

        <button onClick={() => setIsModalOpen(true)} className="px-2 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
          ✏️ Edit Profile
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-md w-11/12 md:w-[400px] transition-colors duration-500">
            <h3 className="text-3xl font-bold text-center mb-6 text-indigo-700">Edit Profile</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="label text-gray-900 dark:text-gray-100">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label text-gray-900 dark:text-gray-100">Photo URL</label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label text-gray-900 dark:text-gray-100">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  value={user?.email}
                  disabled
                />
              </div>

              <div>
                <label className="label text-gray-900 dark:text-gray-100">Role</label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  value="Tourist"
                  disabled
                />
              </div>

              <div className="flex justify-between mt-4">
                <button type="submit" className="px-2 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Save</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-2  rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfiletourist;
