import { useEffect, useState } from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const CommunityPage = () => {
  const [stories, setStories] = useState([]);
  const [expandedStory, setExpandedStory] = useState(null);

  const axiosPublic = useAxios();
  const { user } = useAuth();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        if (user) {
          const token = await user.getIdToken();

          const res = await axiosPublic.get("/stories", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] py-14 px-4 transition-all duration-500">
      {/* Heading */}
      <div className="max-w-7xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Community Stories
        </h2>

        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore beautiful travel experiences shared by travelers around the
          world.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story, idx) => {
          const isExpanded = expandedStory === story._id;

          return (
            <motion.div
              key={story._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -8 }}
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700 flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={story.images?.[0]}
                  alt="Story"
                  className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                <div className="absolute bottom-4 left-4 text-white">
                  <p className="flex items-center gap-1 text-sm opacity-90">
                    <MapPin size={15} />
                    Cox's Bazar, Bangladesh
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                  {story.title || "Travel Story"}
                </h3>

                {/* Story Text */}
                <p
                  className={`text-gray-600 dark:text-gray-300 leading-7 text-sm transition-all duration-300 ${
                    !isExpanded ? "line-clamp-4" : ""
                  }`}
                >
                  {story.text}
                </p>

                {/* Show More Button */}
                {story.text?.length > 180 && (
                  <button
                    onClick={() =>
                      setExpandedStory(
                        isExpanded ? null : story._id
                      )
                    }
                    className="mt-3 text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:underline text-left"
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                  </button>
                )}

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      👤 {story.userName || "Anonymous"}
                    </p>
                  </div>

                  <FacebookShareButton
                    url={"https://your-live-site-url.com/community"}
                    quote={story.text}
                  >
                    <FacebookIcon size={34} round />
                  </FacebookShareButton>
                </div>

            
               
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityPage;