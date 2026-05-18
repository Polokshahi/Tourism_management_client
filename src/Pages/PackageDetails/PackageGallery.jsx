import React from 'react';

const PackageGallery = () => {
  const images = [
    "https://i.ibb.co.com/JRccy0ps/download.avif", 
    "https://i.ibb.co.com/62RDQBG/hill-background-ubizz8tg2ev7zhzi.jpg",
    "https://i.ibb.co.com/HDm6HYPg/sacred-forest.jpg",
   "https://i.ibb.co.com/q3HD9cJn/istockphoto-535168027-612x612.jpg",
  ];

  return (
    <section className="max-w-5xl  mx-auto px-4 my-10 bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <h2 className="text-2xl font-bold mb-6 text-center">Tour Package Gallery</h2>

      {/* First Image Full Width */}
      <div className="mb-4">
        <img
          src={images[0]}
          alt="Gallery Image 1"
          className="w-full h-75 object-cover rounded-xl shadow"
        />
      </div>

      {/* Next 3 Images in Grid */}
      <div className="grid grid-cols-3 gap-4">
        <img
          src={images[1]}
          alt="Gallery Image 2"
          className="w-full h-50 object-cover rounded-xl"
        />
        <img
          src={images[2]}
          alt="Gallery Image 3"
          className="w-full h-50 object-cover rounded-xl"
        />
        <img
          src={images[3]}
          alt="Gallery Image 4"
          className="w-full h-50 object-cover rounded-xl"
        />
      </div>
    </section>
  );
};

export default PackageGallery;
