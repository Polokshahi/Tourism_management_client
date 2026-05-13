import React from 'react';
import { Outlet } from 'react-router';
import Lottie from 'lottie-react';
import TourNest from '../Shared/TourNest/TourNest';

// Import your animation JSON file
import authAnimation from '../../public/Animation.json'; 

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            {/* Header/Logo Section */}
            <header className="p-4 md:p-6 lg:px-12">
                <TourNest />
            </header>

            {/* Main Content Area */}
            <main className="grow flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="container max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-between gap-8 lg:gap-12">
                        
                        {/* Animation Section - Now visible but smaller on mobile, larger on desktop */}
                        <div className="flex flex-1 justify-center items-center w-full max-w-[280px] sm:max-w-md lg:max-w-lg">
                            <div className="relative group w-full">
                                {/* Decorative background glow */}
                                <div className="absolute -inset-1 bg-linear-to-r from-green-600 to-yellow-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                
                                {/* Lottie Animation container */}
                                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden p-2 sm:p-4">
                                    <Lottie 
                                        animationData={authAnimation} 
                                        loop={true} 
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Form/Outlet Section */}
                        <div className="flex-1 w-full max-w-md lg:max-w-none">
                            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl lg:shadow-none lg:bg-transparent">
                                <Outlet />
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <footer className="p-6 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} TourNest. All rights reserved.
            </footer>
        </div>
    );
};

export default AuthLayout;