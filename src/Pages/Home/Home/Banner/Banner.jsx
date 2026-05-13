
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';





const slides = [
  {
    img: 'https://i.ibb.co.com/fV6RCc3v/download.jpg',
    title: 'Cox’s Bazar',
    desc: 'Longest sea beach in the world — a paradise for beach lovers.'
  },
  {
    img: 'https://i.ibb.co.com/9mDLNXjp/Sundarban.jpg',
    title: 'Sundarbans',
    desc: 'Explore the largest mangrove forest and spot the Royal Bengal Tiger.'
  },
  {
    
    img: 'https://i.ibb.co.com/rGwSsbNB/beautiful-bangladesh-at-Rangamati.jpg',
    title: 'Sylhet',
    desc: 'Green valleys, tea gardens, and mystic rivers await your journey.'
  }
];

const Banner = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="h-[70vh] md:h-[80vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

              {/* Content */}
              <div className="relative z-10 text-center text-white max-w-3xl px-6">
                <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="mt-4 text-lg md:text-xl font-medium opacity-90">
                  {slide.desc}
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <button className="px-6 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-md">
                    Explore Now
                  </button>
                  <button className="px-6 py-2 rounded-2xl border-2 border-white hover:bg-white hover:text-black transition font-semibold">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
