"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import GoogleButton from '@/components/GoogleButton';
import axios from 'axios';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email: string; password: string }>({
        email: '',
        password: '',
    });
    const [apiError, setApiError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [apiUser, setApiUser] = useState<{ username?: string } | null>(null); // Store API user info
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value.trim());
        } else if (name === 'password') {
            setPassword(value.trim());
        }
    };

    const validateInputs = () => {
        const newErrors = { email: '', password: '' };
        let isValid = true;

        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,30}$/;

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (!passwordRegex.test(password)) {
            newErrors.password = 'Password must be at least 6 characters and contain letters and numbers';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateInputs()) return;

        setLoading(true);
        setApiError(null);

        try {
            const response = await axios.post('https://agreelink.onrender.com/v1/api/auth/login', {
                email,
                password,
            });

            const data = response.data;
            console.log(data); // Log the response for debugging

            // If the login is successful, response.status will be 200
            if (response.status === 200) {
                setApiUser(data.data.user); // Set the API user details
                router.push('/homePage/dashboard'); // Navigate to the dashboard
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Handle API error
                const errorMessage = error.response.data?.message || 'Login failed. Please try again.';
                setApiError(errorMessage);
            } else {
                // Handle any unexpected errors
                setApiError('An unexpected error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="py-6 sm:py-10 lg:py-16">
            <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto text-center">
                    <GoogleButton />
                    <div className="flex items-center justify-center mt-10">
                        <div className="h-[1px] w-32 bg-black-2"></div>
                        <p className="px-4">Or continue with</p>
                        <div className="h-[1px] w-32 bg-black-2"></div>
                    </div>
                </div>

                <div className="h-[400px] w-[400px] border mx-auto mt-9 customtwo rounded">
                    <form onSubmit={handleSubmit} className="w-full h-full">
                        <div className="w-[300px] h-[40px] mt-9 mx-auto flex flex-col">
                            <label htmlFor="email" className="mb-2">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                className="p-2 border rounded focus:outline-none focus:border-blue-500"
                                value={email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1 mb-10">{errors.email}</p>}
                        </div>

                        <div className="w-[300px] h-[40px] mt-12 mx-auto flex flex-col relative">
                            <label htmlFor="password" className="mb-2">Password</label>
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className="p-2 border rounded focus:outline-none focus:border-blue-500"
                                value={password}
                                onChange={handleInputChange}
                            />
                            <div className="absolute right-2 top-10 cursor-pointer">
                                {showPassword ? (
                                    <HiOutlineEyeOff onClick={togglePasswordVisibility} />
                                ) : (
                                    <HiOutlineEye onClick={togglePasswordVisibility} />
                                )}
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1 mb-10">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            className={`flex border mx-auto justify-center rounded-lg p-3 w-[350px] mt-[80px] text-white-100 ${loading ? 'bg-gray-500' : 'bg-[#4169E1]'}`}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Log in'}
                        </button>

                        {apiError && <p className="text-red-500 text-center mt-4 mb-4">{apiError}</p>}

                        <div className="mt-4 flex justify-center">
                            <p>I don&apos;t have an account</p>
                            <Link href="/Signup" className="text-blue-500 ml-1">Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
