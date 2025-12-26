import React from 'react';
import Link from 'next/link'; // Import Link component for navigation

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200 font-mono flex flex-col">

            <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-md">

                <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                    Pulse Check
                </div>

                {/* Right side: Nav links */}
                <div className="flex gap-6 text-gray-300 font-semibold">
                    <Link href="/about-us" 
                        className="hover:text-teal-400">About Us
                    </Link>
                    <Link href="/login">
                        <span className="hover:text-teal-400 cursor-pointer">Login</span>
                    </Link>
                    <Link href="/signup">
                        <span className="hover:text-teal-400 cursor-pointer">Signup</span>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-r from-blue-900 via-gray-900 to-teal-900">
                <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-orange-400">
                    🚀API Testing Tool
                </h1>
                <p className="mt-4 text-xl text-gray-300 max-w-2xl">
                    A modern developer suite to build, test, and debug APIs with speed and precision.
                </p>
                <div className="mt-8 flex gap-4">
                    <Link href="/tool">
                        <button className="bg-gradient-to-r from-blue-400 to-teal-400 text-black font-bold px-6 py-3 rounded-lg hover:from-blue-300 hover:to-teal-300 transition">
                            Get Started
                        </button>
                    </Link>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12">
                <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold text-blue-400 mb-3">🔧 Request Builder</h2>
                    <p className="text-gray-300">
                        Easily configure endpoints, methods, headers, and body with a clean interface.
                    </p>
                </div>

                <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold text-teal-300 mb-3">📊 Response Viewer</h2>
                    <p className="text-gray-300">
                        Get instant feedback with formatted JSON, status codes, and headers.
                    </p>
                </div>

                <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold text-orange-400 mb-3">📂 History & Collections</h2>
                    <p className="text-gray-300">
                        Save, organize, and reuse your API requests for efficient workflows.
                    </p>
                </div>
            </section>

            <footer className="text-center py-6 border-t border-gray-700 text-gray-500 text-sm">
                Made with using MERN + Next.js + Tailwind CSS
            </footer>
        </div>
    );
};

export default Home;