'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GoogleButton from '@/components/GoogleButton';
import googleLogo from '@/assets/googleLogo.svg';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { PulseLoader } from 'react-spinners';  // Add this for the loading spinner


const Signup = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);  // State for loading
    const [apiError, setApiError] = useState('');  // State for API error message
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        userName: '',
        email: '',
        password: ''
    });
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'userName') {
            setUserName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const validateInputs = () => {
        let formErrors = { userName: '', email: '', password: '' };
        let isValid = true;

        if (!userName) {
            formErrors.userName = 'User Name is required';
            isValid = false;
        }

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

            try {
                const response = await fetch('https://agreelink.onrender.com/v1/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userName,
                        email,
                        password
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    console.log('API Error:', data); // Log the entire response
                    const errorMessage = typeof data === 'object' && data.message ? data.message : 'Registration failed';
                    setApiError(errorMessage);  // Set a more specific error message
                } else {
                    // Redirect on success
                    router.push('/');
                }
            } catch (error) {
                // Log the error to the console for debugging
                console.error('Signup error:', error);
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

                <div className='h-[500px] w-[400px] border mx-auto mt-9 customtwo rounded'>
                    <form onSubmit={handleSubmit} className="w-full h-full">
                        <div className='w-[300px] h-[40px] mt-9 mx-auto flex flex-col'>
                            <label htmlFor="firstName" className='mb-2'>
                                User Name
                            </label>
                            <input
                                name="userName"
                                placeholder='user Name'
                                className='p-2 border rounded focus:outline-none focus:border-blue-500'
                                value={userName}
                                onChange={handleInputChange}
                            />
                            {errors.userName && <p className='text-red-500 text-xs mt-1 mb-10'>{errors.userName}</p>}
                        </div>
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
                        <div className='w-[300px] h-[40px] mt-12 mb-12 mx-auto flex flex-col relative'>
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
                            <div className='mb-9'>
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
                            {errors.password && <p className='text-red-500 text-xs mt-1 mb-36'>{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex border mx-auto  justify-center rounded-lg p-3 w-[350px] mt-6 text-white-100  ${loading ? 'bg-gray-500' : 'bg-[#4169E1]'
                                }`}
                        >
                            {loading ? (
                                <PulseLoader size={12} color={'#fff'} />
                            ) : (
                                'Sign Up'
                            )
                            }
                        </button>

                        {apiError && <p className='text-red-500 text-center mt-4 mb-4'>{typeof apiError === 'string' ? apiError : 'An error occurred'}</p>}

                        <div className='mt-4 flex justify-center'>
                            <p>Already have an account?</p>
                            <Link href="/" className="text-blue-500 ml-1">Sign In</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Signup;
