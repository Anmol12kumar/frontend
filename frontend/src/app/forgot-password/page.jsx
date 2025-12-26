'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

const ResetPassword = () => {
    const { token } = useParams();   // get token from URL
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const resetForm = useFormik({
        initialValues: { password: '', confirmPassword: '' },
        validationSchema: Yup.object({
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Required'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                // Call backend reset route
                await axios.post(`http://localhost:5000/user/reset-password/${token}`, {
                    password: values.password,
                });
                toast.success('Password reset successful!');
                router.push('/login'); // redirect to login
            } catch (err) {
                toast.error('Reset failed or token expired');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
            <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center text-teal-400 mb-6">Reset Password</h1>

                <form onSubmit={resetForm.handleSubmit} className="space-y-6">
                    {/* New Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-300 mb-1">New Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={resetForm.handleChange}
                            value={resetForm.values.password}
                            className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                        />
                        {resetForm.errors.password && resetForm.touched.password && (
                            <p className="text-xs text-red-400 mt-1">{resetForm.errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={resetForm.handleChange}
                            value={resetForm.values.confirmPassword}
                            className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {resetForm.errors.confirmPassword && resetForm.touched.confirmPassword && (
                            <p className="text-xs text-red-400 mt-1">{resetForm.errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Reset Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 text-black font-bold hover:from-teal-300 hover:to-blue-400 transition shadow-md hover:shadow-xl"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;