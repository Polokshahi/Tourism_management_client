import React from 'react';
import { motion } from 'framer-motion';
import { FaHeadset, FaStar, FaWallet } from 'react-icons/fa';

const features = [
  {
    icon: <FaStar className="text-yellow-500" />,
    title: "Top Rated Guides",
    description: "Our tour guides are highly experienced and rated by thousands of travelers.",
  },
  {
    icon: <FaWallet className="text-green-500" />,
    title: "Best Price Guarantee",
    description: "We offer competitive prices with no hidden fees or extra charges.",
  },
  {
    icon: <FaHeadset className="text-blue-500" />,
    title: "24/7 Support",
    description: "Need help? Our support team is available round the clock to assist you.",
  },
];

// Motion variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-black text-black dark:text-white transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          🌟 Why Choose Us?
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow transition-colors duration-500 cursor-pointer hover:scale-105"
              variants={item}
            >
              <div className="text-4xl mx-auto mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 transition-colors duration-500">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-500">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
