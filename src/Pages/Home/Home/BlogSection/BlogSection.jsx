import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "Top 5 Beaches in Bangladesh You Must Visit",
    description:
      "Discover the most beautiful and relaxing beaches in Bangladesh including Cox’s Bazar, Kuakata, and more.",
    image: "https://i.ibb.co.com/SXgWwj9k/gc6.webp",
  },
  {
    id: 2,
    title: "Essential Travel Tips for First-Time Tourists",
    description:
      "From packing hacks to cultural etiquette, here are some must-know tips to make your trip smooth and enjoyable.",
    image: "https://i.ibb.co.com/NRy6jTr/1690178327998.jpg",
  },
  {
    id: 3,
    title: " Serene Horizons",
    description:
      "Stand from afar and witness the endless ocean meeting the sky, a moment of calm and wonder.",
    image: "https://i.ibb.co.com/zTPS25N2/photo.jpg",
  },
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-6 text-indigo-700"
        >
          Travel Tips & Blogs
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {blog.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">
                  {blog.description}
                </p>
                <button className="mt-4 inline-block text-blue-500 hover:text-blue-600 font-medium">
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
