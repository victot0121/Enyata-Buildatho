'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import googleLogo from '@/assets/googleLogo.svg';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'firstName') {
            setFirstName(value);
        } else if (name === 'lastName') {
            setLastName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const validateInputs = () => {
        let formErrors = { firstName: '', lastName: '', email: '', password: '' };
        let isValid = true;

        if (!firstName) {
            formErrors.firstName = 'First Name is required';
            isValid = false;
        }

        if (!lastName) {
            formErrors.lastName = 'Last Name is required';
            isValid = false;
        }

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateInputs()) {
            router.push('/homePage/dashboard');
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
                    <div className='flex border mx-auto shadow-custom justify-center rounded-lg p-2 max-w-xs'>
                        <Image
                            src={googleLogo}
                            alt="Google Logo"
                            className="h-12"
                        />
                        <p className='mt-3 pl-4 text-sm'>Sign up with Google</p>
                    </div>

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
                                First Name
                            </label>
                            <input
                                name="firstName"
                                placeholder='First Name'
                                className='p-2 border rounded focus:outline-none focus:border-blue-500'
                                value={firstName}
                                onChange={handleInputChange}
                            />
                            {errors.firstName && <p className='text-red-500 text-xs mt-1 mb-10'>{errors.firstName}</p>}
                        </div>
                        <div className='w-[300px] h-[40px] mt-9 mx-auto flex flex-col'>
                            <label htmlFor="lastName" className='mb-2'>
                                Last Name
                            </label>
                            <input
                                name="lastName"
                                placeholder='Last Name'
                                className='p-2 border rounded focus:outline-none focus:border-blue-500'
                                value={lastName}
                                onChange={handleInputChange}
                            />
                            {errors.lastName && <p className='text-red-500 text-xs mt-1 mb-10'>{errors.lastName}</p>}
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
                            {errors.password && <p className='text-red-500 text-xs mt-1 mb-10'>{errors.password}</p>}
                        </div>

                        <button type="submit" className='flex border mx-auto bg-[#4169E1] justify-center rounded-lg p-3 w-[350px] mt-6 text-white-100'>
                            Sign Up
                        </button>

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
