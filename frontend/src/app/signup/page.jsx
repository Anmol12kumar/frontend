'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

const SignupSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('naam nahi hai kya...'),
    email: Yup.string().email('Invalid email').required('email chahiye bhai...!'),
    password: Yup.string()
        .matches(/[a-z]/, "password mein ek lowercase letter hona chahiye")
        .matches(/[A-Z]/, "password mein ek uppercase letter hona chahiye")
        .matches(/[0-9]/, "password mein ek number hona chahiye")
        .matches(/\W/, "password mein ek special character hona chahiye")
        .min(8, 'Password too short')
        .required('password chahiye bhai...!'),
    confirmPassword: Yup.string().required('confirm your password').oneOf([Yup.ref('password')], 'Passwords alag hai bhai...!')
});

const SignUp = () => {
    const router = useRouter();

    const signupForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            termsAccepted: Yup.boolean().oneOf([true], 'Terms accept karna padega bhai!')
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            axios.post('http://localhost:5000/user/add', values)
                .then((response) => {
                    toast.success("User Registered Successfully..!!");
                    resetForm();
                    router.push('/login');
                })
                .catch((error) => {
                    toast.error("User Registration Failed..!!");
                    console.log(error);
                });
        },
        validationSchema: SignupSchema,
    });
    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">

            {/* Animated background blobs */}
            <div className="absolute w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

            {/* Signup Card */}
            <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl p-8">
                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
                    Create Your Account
                </h1>
                <p className="text-center text-sm text-gray-400 mb-6">
                    Already have an account? <a href="/login" className="text-teal-300 hover:underline">Sign in here</a>
                </p>

                {/* Google Sign-up */}
                <button
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg 
                    bg-white/10 backdrop-blur-md border border-gray-600 
                    text-white font-semibold transition duration-300 
                    shadow-md hover:shadow-xl hover:scale-[1.03] relative overflow-hidden"
                >
                    {/* Gradient glow ring */}
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] opacity-30 blur-md"></span>

                    {/* Text */}
                    <span className="relative z-10 text-sm tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400">
                        Sign up with Google
                    </span>
                </button>


                <div className="text-center text-gray-500 mb-4">OR</div>

                {/* Form */}
                <form onSubmit={signupForm.handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm text-gray-300 mb-1">Name</label>
                        <input type="text" id="name" name="name" onChange={signupForm.handleChange} value={signupForm.values.name} className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-pink-400 focus:outline-none" />
                        {signupForm.errors.name && signupForm.touched.name && (
                            <p className="text-xs text-red-400 mt-1">{signupForm.errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email address</label>
                        <input type="email" id="email" name="email" onChange={signupForm.handleChange} value={signupForm.values.email} className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-400 focus:outline-none" />
                        {signupForm.errors.email && signupForm.touched.email && (
                            <p className="text-xs text-red-400 mt-1">{signupForm.errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Password</label>
                        <input type="password" id="password" name="password" onChange={signupForm.handleChange} value={signupForm.values.password} className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                        {signupForm.errors.password && signupForm.touched.password && (
                            <p className="text-xs text-red-400 mt-1">{signupForm.errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-1">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" onChange={signupForm.handleChange} value={signupForm.values.confirmPassword} className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                        {signupForm.errors.confirmPassword && signupForm.touched.confirmPassword && (
                            <p className="text-xs text-red-400 mt-1">{signupForm.errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Terms */}
                    <div className="flex items-center">
                        <input type="checkbox" id="terms" name="terms" onChange={signupForm.handleChange} checked={signupForm.values.terms} className="mr-2 accent-teal-400" />
                        <label htmlFor="terms" className="text-sm text-gray-300">
                            I accept the <a href="/terms" className="text-teal-300 hover:underline">Terms and Conditions</a>
                        </label>
                    </div>
                    {signupForm.errors.terms && signupForm.touched.terms && (
                        <p className="text-xs text-red-400 mt-1">{signupForm.errors.terms}</p>
                    )}

                    {/* Submit */}
                    <button type="submit" className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-pink-400 via-purple-500 to-teal-400 text-black font-bold hover:from-pink-300 hover:to-teal-300 transition" >
                        Sign up
                    </button>
                </form>
            </div>
        </div>

        // <div className="mt-7 w-1/3 mx-auto bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-600 dark:border-neutral-800">
        //     <div className="p-4 sm:p-7">
        //         <div className="text-center">
        //             <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
        //                 Sign up
        //             </h1>
        //             <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
        //                 Already have an account?
        //                 <a
        //                     className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
        //                     href="/login"
        //                 >
        //                     Sign in here
        //                 </a>
        //             </p>
        //         </div>
        //         <div className="mt-5">
        //             <button
        //                 type="button"
        //                 className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        //             >
        //                 <svg
        //                     className="w-4 h-auto"
        //                     width={46}
        //                     height={47}
        //                     viewBox="0 0 46 47"
        //                     fill="none"
        //                 >
        //                     <path
        //                         d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
        //                         fill="#4285F4"
        //                     />
        //                     <path
        //                         d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
        //                         fill="#34A853"
        //                     />
        //                     <path
        //                         d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
        //                         fill="#FBBC05"
        //                     />
        //                     <path
        //                         d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
        //                         fill="#EB4335"
        //                     />
        //                 </svg>
        //                 Sign up with Google
        //             </button>
        //             <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
        //                 Or
        //             </div>
        //             {/* Form */}
        //             <form onSubmit={signupForm.handleSubmit}>
        //                 <div className="grid gap-y-4">
        //                     {/* Form Group */}
        //                     <div>
        //                         <label
        //                             htmlFor="name"
        //                             className="block text-sm mb-2 dark:text-white"
        //                         >
        //                             Name
        //                         </label>
        //                         <div className="relative">
        //                             <input
        //                                 type="name"
        //                                 id="name"
        //                                 name="name"
        //                                 onChange={signupForm.handleChange}
        //                                 value={signupForm.values.name}
        //                                 className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-700"
        //                                 required=""
        //                                 aria-describedby="name-error"
        //                             />
        //                             <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
        //                                 <svg
        //                                     className="size-5 text-red-500"
        //                                     width={16}
        //                                     height={16}
        //                                     fill="currentColor"
        //                                     viewBox="0 0 16 16"
        //                                     aria-hidden="true"
        //                                 >
        //                                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        //                                 </svg>
        //                             </div>
        //                         </div>
        //                         {
        //                             (signupForm.errors.name && signupForm.touched.name) && (      //
        //                                 <p className='text-xs text-red-600 mt-2'>
        //                                     {
        //                                         signupForm.errors.name                    //displaying error message for name field
        //                                     }
        //                                 </p>
        //                             )
        //                         }
        //                     </div>
        //                     {/* End Form Group */}
        //                     {/* Form Group */}
        //                     <div>
        //                         <label
        //                             htmlFor="email"
        //                             className="block text-sm mb-2 dark:text-white"
        //                         >
        //                             Email address
        //                         </label>
        //                         <div className="relative">
        //                             <input
        //                                 type="email"
        //                                 id="email"
        //                                 name="email"
        //                                 onChange={signupForm.handleChange}
        //                                 value={signupForm.values.email}
        //                                 className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        //                                 required=""
        //                                 aria-describedby="email-error"
        //                             />
        //                             <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
        //                                 <svg
        //                                     className="size-5 text-red-500"
        //                                     width={16}
        //                                     height={16}
        //                                     fill="currentColor"
        //                                     viewBox="0 0 16 16"
        //                                     aria-hidden="true"
        //                                 >
        //                                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        //                                 </svg>
        //                             </div>
        //                         </div>
        //                         {
        //                             (signupForm.errors.email && signupForm.touched.email) && (      //
        //                                 <p className='text-xs text-red-600 mt-2'>
        //                                     {
        //                                         signupForm.errors.email                    //displaying error message for name field
        //                                     }
        //                                 </p>
        //                             )
        //                         }
        //                     </div>
        //                     {/* End Form Group */}
        //                     {/* Form Group */}
        //                     <div>
        //                         <label
        //                             htmlFor="password"
        //                             className="block text-sm mb-2 dark:text-white"
        //                         >
        //                             Password
        //                         </label>
        //                         <div className="relative">
        //                             <input
        //                                 type="password"
        //                                 id="password"
        //                                 name="password"
        //                                 onChange={signupForm.handleChange}
        //                                 value={signupForm.values.password}
        //                                 className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        //                                 required=""
        //                                 aria-describedby="password-error"
        //                             />
        //                             <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
        //                                 <svg
        //                                     className="size-5 text-red-500"
        //                                     width={16}
        //                                     height={16}
        //                                     fill="currentColor"
        //                                     viewBox="0 0 16 16"
        //                                     aria-hidden="true"
        //                                 >
        //                                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        //                                 </svg>
        //                             </div>
        //                         </div>
        //                         {
        //                             (signupForm.errors.password && signupForm.touched.password) && (
        //                                 <p className='text-xs text-red-600 mt-2'>
        //                                     {
        //                                         signupForm.errors.password                    //displaying error message for name field
        //                                     }
        //                                 </p>
        //                             )
        //                         }
        //                     </div>
        //                     {/* End Form Group */}
        //                     {/* Form Group */}
        //                     <div>
        //                         <label
        //                             htmlFor="confirmPassword"
        //                             className="block text-sm mb-2 dark:text-white"
        //                         >
        //                             Confirm Password
        //                         </label>
        //                         <div className="relative">
        //                             <input
        //                                 type="password"
        //                                 id="confirmPassword"
        //                                 name="confirmPassword"
        //                                 onChange={signupForm.handleChange}
        //                                 value={signupForm.values.confirmPassword}
        //                                 className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        //                                 required=""
        //                                 aria-describedby="confirmPassword-error"
        //                             />
        //                             <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
        //                                 <svg
        //                                     className="size-5 text-red-500"
        //                                     width={16}
        //                                     height={16}
        //                                     fill="currentColor"
        //                                     viewBox="0 0 16 16"
        //                                     aria-hidden="true"
        //                                 >
        //                                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        //                                 </svg>
        //                             </div>
        //                         </div>
        //                         {
        //                             (signupForm.errors.confirmPassword && signupForm.touched.confirmPassword) && (
        //                                 <p className='text-xs text-red-600 mt-2'>
        //                                     {
        //                                         signupForm.errors.confirmPassword                    //displaying error message for name field
        //                                     }
        //                                 </p>
        //                             )
        //                         }
        //                     </div>
        //                     {/* End Form Group */}
        //                     {/* Checkbox */}
        //                     <div className="flex items-center">
        //                         <div className="flex">
        //                             <input
        //                                 id="remember-me"
        //                                 name="remember-me"
        //                                 type="checkbox"
        //                                 className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
        //                             />
        //                         </div>
        //                         <div className="ms-3">
        //                             <label htmlFor="remember-me" className="text-sm dark:text-white">
        //                                 I accept the{" "}
        //                                 <a
        //                                     className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
        //                                     href="#"
        //                                 >
        //                                     Terms and Conditions
        //                                 </a>
        //                             </label>
        //                         </div>
        //                     </div>
        //                     {/* End Checkbox */}
        //                     <button
        //                         type="submit"
        //                         className=" w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        //                     >
        //                         Sign up
        //                     </button>
        //                 </div>
        //             </form>
        //             {/* End Form */}
        //         </div>
        //     </div>
        // </div>

    )
}

export default SignUp;