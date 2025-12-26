'use client';
import React from 'react';
import Link from 'next/link';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-100 font-sans flex flex-col">

            {/* Header */}
            <header className="px-8 py-6 bg-gradient-to-r from-teal-700 via-blue-800 to-purple-900 shadow-lg">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                    About Pulse Check
                </h1>
            </header>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-16 px-6">
                <h2 className="text-5xl font-bold mb-6 text-teal-400">Empowering Developers 🚀</h2>
                <p className="max-w-3xl text-lg text-gray-300 leading-relaxed">
                    Pulse Check is a modern API testing suite built with MERN + Next.js.
                    Our mission is to simplify API development by providing a clean, fast, and developer-centric tool
                    that blends functionality with style.
                </p>
            </section>

            {/* Team / Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12 py-12">
                <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl font-semibold text-teal-300 mb-3">💡 Innovation</h3>
                    <p className="text-gray-400">
                        We believe in building tools that inspire creativity and streamline workflows.
                    </p>
                </div>

                <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl font-semibold text-blue-400 mb-3">🤝 Collaboration</h3>
                    <p className="text-gray-400">
                        Designed for teams and individuals, Pulse Check makes API testing accessible and shareable.
                    </p>
                </div>

                <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl font-semibold text-pink-400 mb-3">⚡ Performance</h3>
                    <p className="text-gray-400">
                        Speed and precision are at the core of our design, ensuring developers stay productive.
                    </p>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-12">
                <Link href="/tool">
                    <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-black font-bold px-8 py-4 rounded-lg hover:from-teal-300 hover:to-blue-400 transition">
                        Try the Tool Now
                    </button>
                </Link>
            </section>

            {/* Footer */}
            <footer className="text-center py-6 border-t border-gray-700 text-gray-500 text-sm">
                © {new Date().getFullYear()} Pulse Check | Built with MERN + Next.js + Tailwind CSS
            </footer>
        </div>
    );
};

export default About;