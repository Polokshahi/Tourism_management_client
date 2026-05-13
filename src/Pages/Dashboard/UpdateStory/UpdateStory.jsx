import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateStory = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/stories/${id}`)
      .then(res => setStory(res.data))
      .catch(err => console.error(err));
  }, [id, axiosSecure]);

  const handleRemoveImage = (img) => {
    setRemovedImages([...removedImages, img]);
    setStory({
      ...story,
      images: story.images.filter(i => i !== img)
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setNewImages([...newImages, ...urls]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedStory = {
      title: form.title.value,
      text: form.text.value
    };

    try {
      await axiosSecure.put(`/stories/${id}`, updatedStory);

      if (removedImages.length > 0) {
        await axiosSecure.patch(`/stories/remove-images/${id}`, { images: removedImages });
      }

      if (newImages.length > 0) {
        await axiosSecure.patch(`/stories/add-images/${id}`, { images: newImages });
      }

      Swal.fire('Success!', 'Story updated successfully!', 'success');
      navigate('/dashboard/my-story');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to update story', 'error');
    }
  };

  if (!story) return <div className="text-center mt-10 text-gray-700 dark:text-gray-300">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md transition-colors duration-500">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">Edit Story</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          defaultValue={story.title}
          className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          placeholder="Story Title"
          required
        />
        <textarea
          name="text"
          defaultValue={story.text}
          className="textarea textarea-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          rows={5}
          placeholder="Story Text"
          required
        ></textarea>

        <label className="block font-semibold text-gray-900 dark:text-gray-100">Existing Images:</label>
        <div className="grid grid-cols-3 gap-3">
          {story.images?.map((img, idx) => (
            <div key={idx} className="relative">
              <img src={img} alt="" className="w-full h-24 object-cover rounded" />
              <button
                type="button"
                onClick={() => handleRemoveImage(img)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <label className="block font-semibold mt-4 text-gray-900 dark:text-gray-100">Add New Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input file-input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
        />

        {newImages.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-2">
            {newImages.map((img, idx) => (
              <img key={idx} src={img} alt="" className="w-full h-24 object-cover rounded" />
            ))}
          </div>
        )}

        <button type="submit" className="px-2 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
          Update Story
        </button>
      </form>
    </div>
  );
};

export default UpdateStory;
