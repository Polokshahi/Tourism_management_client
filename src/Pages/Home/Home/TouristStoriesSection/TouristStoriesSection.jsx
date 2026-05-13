import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FacebookShareButton } from 'react-share';
import useAuth from '../../../../hooks/useAuth';
import useAxios from '../../../../hooks/useAxios';
import { useDarkMode } from '../../../../Contexts/ThemeContext';

const TouristStoriesSection = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const { darkmode } = useDarkMode();

  useEffect(() => {
    axiosSecure
      .get('/stories/random?limit=4')
      .then((res) => setStories(res.data))
      .catch((err) => console.error('Error fetching stories:', err));
  }, [axiosSecure]);

  const handleShare = (storyId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    const url = `${window.location.origin}/story/${storyId}`;
    navigator.clipboard.writeText(url);
    alert('Story link copied! Now you can share.');
  };

  return (
    <div
      className={`py-10 px-4 md:px-8 rounded-xl shadow-lg transition-colors duration-500 ${
        darkmode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <h2
        className={`text-3xl font-bold text-center mb-6 text-indigo-700 ${
          darkmode ? 'text-indigo-700' : 'text-blue-600'
        }`}
      >
        Tourist Stories
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {stories.map((story) => (
          <div
            key={story._id}
            className={`flex flex-col justify-between p-6 rounded-lg shadow hover:shadow-md transition-colors duration-500 ${
              darkmode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
            }`}
          >
            {/* Images */}
            <div className="flex items-center gap-3 mb-3 overflow-x-auto">
              {story.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Story"
                  className={`h-24 w-24 object-cover rounded-xl shadow-md transition-colors duration-500 ${
                    darkmode ? 'bg-gray-700' : 'bg-white'
                  }`}
                />
              ))}
            </div>

            {/* Description */}
            <p
              className={`mb-4 transition-colors duration-500 ${
                darkmode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {story.description?.slice(0, 120)}...
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-auto">
              <FacebookShareButton url={`${window.location.origin}/story/${story._id}`}>
                <span className="px-2 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Share on Facebook</span>
              </FacebookShareButton>

              <button
                onClick={() => handleShare(story._id)}
                className={`px-2  rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition ${
                  darkmode ? 'btn-neutral' : ''
                }`}
              >
                Copy Link
              </button>

              
            </div>
          </div>
        ))}
      </div>

      {/* See All Stories */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/communitypage')}
          className={`px-4 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition  ${
            darkmode ? 'bg-[#443dff] text-black hover:bg-[#66c884]' : ''
          }`}
        >
          See All Stories
        </button>
      </div>
    </div>
  );
};

export default TouristStoriesSection;
