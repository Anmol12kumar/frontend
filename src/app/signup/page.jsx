'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const API_BASE_URL = 'http://localhost:5000/api';

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validateForm = () => {
        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return false;
        }
        if (name.length < 2) {
            setError("Name must be at least 2 characters");
            return false;
        }
        if (!email.includes("@")) {
            setError("Please enter a valid email");
            return false;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        return true;
    };

    const handleSignup = async () => {
        setError("");
        setSuccess("");

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
                name,
                email,
                password,
            });

            setSuccess("Signup successful 🎉");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err) {
            const message = err.response?.data?.message || "Signup failed ❌";
            setError(message);
            console.error("Signup error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSignup();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-white mb-6">
                    🐾 FurEver Home Signup
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-200 text-sm">
                        {success}
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="w-full mb-4 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:border-white/60 transition disabled:opacity-50"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="w-full mb-4 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:border-white/60 transition disabled:opacity-50"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="w-full mb-4 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:border-white/60 transition disabled:opacity-50"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="w-full mb-6 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:border-white/60 transition disabled:opacity-50"
                />

                <button
                    onClick={handleSignup}
                    disabled={isLoading}
                    className="w-full px-6 py-2 rounded-xl bg-gradient-to-r from-green-400 to-teal-600 text-white font-semibold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Signing up..." : "Sign Up"}
                </button>

                <p className="text-center text-gray-300 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-pink-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}