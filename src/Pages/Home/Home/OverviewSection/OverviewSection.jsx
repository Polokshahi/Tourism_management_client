import React from 'react';
import { motion } from 'framer-motion';
import { Map, Globe2, Compass, ShieldCheck } from 'lucide-react';


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const tourImage = 'https://i.ibb.co.com/TqYpmDnd/Day-Trips-from-Los-Cabos.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const OverviewSection = () => {
  const highlights = [
    {
      title: "Exclusive Destinations",
      desc: "We take you to hidden gems and off-the-beaten-path locations that standard tours often miss.",
      icon: <Map className="w-5 h-5 text-sky-500" />,
    },
    {
      title: "Local Expert Guides",
      desc: "Our professional local guides introduce you to the authentic history and vibrant culture of every destination.",
      icon: <Compass className="w-5 h-5 text-sky-500" />,
    },
    {
      title: "Safe & Comfortable Travel",
      desc: "Your safety is our priority. We ensure premium accommodation and secure transportation for every trip.",
      icon: <ShieldCheck className="w-5 h-5 text-sky-500" />,
    },
    {
      title: "Global Partner Network",
      desc: "Direct partnerships with tour operators worldwide allow us to provide you with the best travel deals.",
      icon: <Globe2 className="w-5 h-5 text-sky-500" />,
    },
  ];

  return (
    <section className="relative py-24 px-6 md:px-20 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-sky-50 dark:bg-sky-900/10 rounded-full blur-3xl opacity-50" />
      
      <motion.div
        className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Text Content */}
        <div className="order-2 lg:order-1">
          <motion.div variants={fadeUp} className="space-y-4">
            <h3 className="text-sky-600 dark:text-sky-400 font-semibold tracking-wider uppercase text-sm">
              Our Specialization
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Start Your Dream Journey <br />
              <span className="text-sky-500">With Tour 24/7 Today.</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
              Tour 24/7 is more than just a website; it is your personalized gateway to discovering the world. Whether you want to get lost in the mountains or dive into the blue waters of the ocean, we are here by your side.
            </p>
          </motion.div>

          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <motion.div 
                key={index} 
                variants={fadeUp}
                className="group p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
              >
                <div className="mb-3 p-2 w-fit rounded-lg bg-sky-50 dark:bg-sky-900/20 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image Part */}
        <motion.div 
          className="order-1 lg:order-2 relative"
          variants={{
            hidden: { opacity: 0, scale: 0.9, x: 20 },
            show: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.8 } }
          }}
        >
          <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={tourImage}
              alt="Professional Tourism Solutions"
              className="w-full aspect-[4/5] lg:aspect-square object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          
          {/* Floating Card Badge */}
          <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hidden sm:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                10k+
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-tighter">Satisfied Clients</p>
                <p className="font-bold text-gray-900 dark:text-gray-100 italic">Successful Travel Stories</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OverviewSection;