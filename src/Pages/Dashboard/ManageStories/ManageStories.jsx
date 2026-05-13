import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const ManageStories = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: stories = [], refetch } = useQuery({
    queryKey: ['stories', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this story?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/stories/${id}`);
        if (res.data.deletedCount) {
          Swal.fire("Deleted!", "Story has been deleted.", "success");
          refetch();
        }
      } catch (err) {
        console.log(err)
        Swal.fire("Error", "Failed to delete story.", "error");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/update-story/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {stories.length > 0 ? (
        stories.map((story) => (
          <div key={story._id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-black dark:text-white">{story.title}</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{story.description}</p>

              <div className="grid grid-cols-2 gap-2 mt-3">
                {story.images?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Story"
                    className="w-full h-24 object-cover rounded"
                  />
                ))}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => handleEdit(story._id)} className="px-2 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(story._id)} className="px-2  rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center col-span-3 text-gray-500 dark:text-gray-400">
          No stories found.
        </p>
      )}
    </div>
  );
};

export default ManageStories;
