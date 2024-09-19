'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import GoogleButton from '@/components/GoogleButton';
import { TbArrowBack } from "react-icons/tb";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email: string; password: string }>({
        email: '',
        password: '',
    });
    const [apiError, setApiError] = useState<string | null>(null); // For API errors
    const [loading, setLoading] = useState(false); // Loading state
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const validateInputs = () => {
        let formErrors = { email: '', password: '' };
        let isValid = true;

        if (!email) {
            formErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            formErrors.email = 'Invalid email address';
            isValid = false;
        }

        // Check for password complexity: at least one letter, one number, and one special character
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        if (!password) {
            formErrors.password = 'Password is required';
            isValid = false;
        } else if (!passwordRegex.test(password)) {
            formErrors.password = 'Password must be at least 6 characters, contain letters, numbers, and a special character';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateInputs()) {
            setLoading(true);  // Start loading
            setApiError(null);  // Clear any previous errors

            try {
                const response = await fetch('https://agreelink.onrender.com/v1/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    // Handle error from the API
                    const errorMessage = data?.message || 'Login failed';
                    setApiError(errorMessage);
                } else {
                    // Redirect to the dashboard on successful login
                    router.push('/homePage/dashboard');
                }
            } catch (error) {
                setApiError('An error occurred. Please try again.');
            } finally {
                setLoading(false);  // Stop loading
            }
        } else {
            alert('Please fill in all required fields');
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
                    <div className='flex items-center justify-center mt-10'>
                        <div className='h-[1px] w-32 bg-black-2'></div>
                        <p className='px-4'>Or continue with</p>
                        <div className='h-[1px] w-32 bg-black-2'></div>
                    </div>
                </div>

                <div className='h-[400px] w-[400px] border mx-auto mt-9 customtwo rounded'>
                    <form onSubmit={handleSubmit} className="w-full h-full">
                        <div className='w-[300px] h-[40px] mt-9 mx-auto flex flex-col'>
                            <label htmlFor="email" className='mb-2'>
                                Email
                            </label>
                            <input
                                name="email"
                                placeholder='Email'
                                className='p-2 border rounded focus:outline-none focus:border-blue-500'
                                value={email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <p className='text-red-500 text-xs mt-1 mb-10'>{errors.email}</p>}
                        </div>
                        <div className='w-[300px] h-[40px] mt-12 mx-auto flex flex-col relative'>
                            <label htmlFor="password" className='mb-2'>
                                Password
                            </label>
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                className='p-2 border rounded focus:outline-none focus:border-blue-500'
                                value={password}
                                onChange={handleInputChange}
                            />
                            {/* Toggle password visibility icon */}
                            <div className=''>
                                {showPassword ? (
                                    <HiOutlineEyeOff
                                        className='absolute right-2 top-10 cursor-pointer'
                                        onClick={togglePasswordVisibility}
                                    />
                                ) : (
                                    <HiOutlineEye
                                        className='absolute right-2 top-10 cursor-pointer'
                                        onClick={togglePasswordVisibility}
                                    />
                                )}
                            </div>
                            {errors.password && <p className='text-red-500 text-xs mt-1 mb-10'>{errors.password}</p>}
                        </div>

                        <div className='mt-[50px] flex w-full justify-between items-center px-8'>
                            <div className='flex items-center'>
                                <span className='ml-2'>Remember me</span>
                            </div>
                            <div className='text-red-400 cursor-pointer'>
                                Forget password
                            </div>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className={`flex border mx-auto justify-center rounded-lg p-3 w-[350px] mt-6 text-white-100 ${loading ? 'bg-gray-500' : 'bg-[#4169E1]'
                                }`}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Log in'}
                        </button>

                        {/* API Error */}
                        {apiError && (
                            <p className="text-red-500 text-center mt-4 mb-4">{apiError}</p>
                        )}

                        <div className='mt-4 flex justify-center'>
                            <p>I don&apos;t have an account</p>
                            <Link href="/Signup" className="text-blue-500 ml-1">Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default SignIn;
