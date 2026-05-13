import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-green-100 dark:from-gray-900 dark:to-gray-800 px-4">
            <div className="text-center space-y-6">
                <h1 className="text-[100px] md:text-[140px] font-extrabold text-blue-600 dark:text-green-400">
                    404
                </h1>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
                    Page Not Found
                </h2>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                    Sorry, the page you are looking for does not exist.
                    <br className="hidden md:block" />
                    (Maybe it went for a Tourism Management System)
                </p>
                <Link
                    to="/"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition duration-300"
                >
                    ✎ Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
