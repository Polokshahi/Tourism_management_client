import { useEffect, useState } from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { motion } from "framer-motion";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const CommunityPage = () => {
  const [stories, setStories] = useState([]);
  const axiosPublic = useAxios();
  const { user } = useAuth();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        if (user) {
          const token = await user.getIdToken();
          const res = await axiosPublic.get("/stories", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setStories(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      }
    };
    fetchStories();
  }, [axiosPublic, user]);

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-10 bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-6 text-indigo-700"
      >
        🌍 Community Stories
      </motion.h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story, idx) => (
          <motion.div
            key={story._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="rounded-2xl p-5 shadow-lg hover:shadow-xl bg-gray-100 text-black dark:bg-gray-900 dark:text-white shadow-gray-300 dark:shadow-gray-800 transition-colors duration-500"
          >
            <img
              src={story.images?.[0]}
              alt="Story"
              className="w-full h-48 object-cover rounded-xl"
            />
            <h3 className="text-xl font-semibold mt-4">
              {story.title || "Travel Story"}
            </h3>
            <p className="mt-2 leading-relaxed">{story.text}</p>
            <p className="text-sm opacity-70 mt-1">
              👤 {story.userName || "Anonymous"}
            </p>

            {/* Share button */}
            <div className="mt-4">
              <FacebookShareButton
                url={"https://your-live-site-url.com/community"}
                quote={story.text}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
