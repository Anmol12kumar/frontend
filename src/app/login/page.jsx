'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const API_BASE_URL = 'http://localhost:5000/api';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                alert("Login successful 🎉");
                router.push("/");
            }
        } catch (err) {
            const message = err.response?.data?.message || "Login failed ❌";
            setError(message);
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-white mb-6">
                    🐾 FurEver Home Login
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
                        {error}
                    </div>
                )}

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
                    className="w-full mb-6 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:border-white/60 transition disabled:opacity-50"
                />

                <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-gray-300 mt-6">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-pink-400 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}