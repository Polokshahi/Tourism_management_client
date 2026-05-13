import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';

const AddStory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || images.length === 0) {
      Swal.fire('Error', 'Please fill all fields and upload at least one image.', 'error');
      return;
    }

    try {
      const uploadedUrls = [];

      for (let img of images) {
        const formData = new FormData();
        formData.append('image', img);

        const uploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`;
        const res = await axios.post(uploadURL, formData);
        if (res.data.success) {
          uploadedUrls.push(res.data.data.url);
        } else {
          Swal.fire('Error', 'Image upload failed. Please try again.', 'error');
          return;
        }
      }

      setImageUrls(uploadedUrls);

      const storyData = {
        title,
        description,
        images: uploadedUrls,
        userEmail: user?.email,
        userName: user?.displayName,
        userPhoto: user?.photoURL,
        createdAt: new Date(),
      };

      const response = await axiosSecure.post('/stories', storyData);
      if (response.data.insertedId) {
        Swal.fire('Success', 'Story added successfully!', 'success');
        navigate('/dashboard/my-story');
      } else {
        Swal.fire('Error', 'Story not saved to server.', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', err.message || 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-6 transition-colors duration-500">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        Add Your Travel Story
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">
            Story Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">
            Your Experience
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full min-h-[150px] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">
            Upload Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="px-2 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Submit Story
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStory;
