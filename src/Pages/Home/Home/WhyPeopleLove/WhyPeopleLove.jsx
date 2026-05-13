import React from 'react';
import { motion } from 'framer-motion';
import { FaSmile, FaMapMarkedAlt, FaWallet } from 'react-icons/fa';

const features = [
  {
    icon: <FaSmile className="text-4xl text-[#0ea5e9]" />,
    title: "Trusted by Thousands",
    description:
      "Thousands of happy travelers choose TourNest every year for our unmatched service and experience.",
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-[#0ea5e9]" />,
    title: "Explore Hidden Gems",
    description:
      "We connect you with local guides who help you discover places beyond typical tourist spots.",
  },
  {
    icon: <FaWallet className="text-4xl text-[#0ea5e9]" />,
    title: "Best Price Guarantee",
    description:
      "Enjoy premium packages and accommodations at the most competitive prices, guaranteed.",
  },
];

// Motion variants
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const WhyPeopleLove = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        Why People <span className="text-[#0ea5e9]">Love TourNest</span>
      </h2>

      <motion.div
        className="grid md:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            variants={itemVariant}
            className="bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition-transform duration-300 transition-colors"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 transition-colors duration-500">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-500">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyPeopleLove;
