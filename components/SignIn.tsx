'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import googleLogo from '@/assets/googleLogo.svg';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { FaSpinner } from 'react-icons/fa'; // Loading spinner icon

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState<{ email: string; password: string; general: string }>({
        email: '',
        password: '',
        general: '' // General error message
    });
    const router = useRouter();

    // Function to handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    // Function to validate form inputs
    const validateInputs = () => {
        let formErrors = { email: '', password: '', general: '' };
        let isValid = true;

        if (!email) {
            formErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            formErrors.email = 'Invalid email address';
            isValid = false;
        }

        if (!password) {
            formErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            formErrors.password = 'Password must be more than 6 characters';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateInputs()) return;

        setLoading(true); // Show loading spinner
        setErrors({ ...errors, general: '' }); // Clear general errors

        try {
            const response = await fetch('https://agreelink.onrender.com/v1/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/homePage/dashboard'); // Navigate to dashboard on success
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            setErrors({ ...errors, general: error.message });
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="py-6 sm:py-10 lg:py-16">
            <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto text-center">
                    <div className='flex border mx-auto shadow-custom justify-center rounded-lg p-2 max-w-xs'>
                        <Image
                            src={googleLogo}
                            alt="left side"
                            className="h-12"
                        />
                        <p className='mt-3 pl-4 text-sm'>Login with Google</p>
                    </div>

                    <div className='flex items-center justify-center mt-10'>
                        <div className='h-[1px] w-32 bg-black-2'></div>
                        <p className='px-4'>Or continue with</p>
                        <div className='h-[1px] w-32 bg-black-2'></div>
                    </div>
                </div>

                <div className='h-300 w-[400px] border mx-auto mt-9 customtwo rounded'>
                    <form onSubmit={handleSubmit} className="w-full h-full">
                        <div className='w-[300px] h-[40px] mt-5 mx-auto flex flex-col'>
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

                        {errors.general && (
                            <div className='text-red-500 text-sm mt-2'>
                                {errors.general}
                            </div>
                        )}

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
                            className='flex border mx-auto bg-[#4169E1] justify-center rounded-lg p-3 w-[350px] mt-6 text-white-100'
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin mr-2" /> // Show spinner
                            ) : (
                                'Log in'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default SignIn;
