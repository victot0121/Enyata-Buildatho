'use client';

import { useRouter } from 'next/navigation';
import React, { useReducer, useState } from 'react';
import axios from 'axios';  // Import axios
import Image from 'next/image';
import Link from 'next/link';
import GoogleButton from '@/components/GoogleButton';
import googleLogo from '@/assets/googleLogo.svg';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { PulseLoader } from 'react-spinners';

// Define initial state for the form
const initialState = {
    username: '',  // Changed from userName to username
    email: '',
    password: '',
    loading: false,
    apiError: '',
    errors: {
        username: '',  // Updated for consistency
        email: '',
        password: ''
    },
    showPassword: false
};

// Define action types
const actionTypes = {
    SET_FIELD: 'SET_FIELD',
    SET_LOADING: 'SET_LOADING',
    SET_ERRORS: 'SET_ERRORS',
    SET_API_ERROR: 'SET_API_ERROR',
    TOGGLE_PASSWORD: 'TOGGLE_PASSWORD',
    RESET_FORM: 'RESET_FORM'
};

// Reducer function to manage form state
const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_FIELD:
            return {
                ...state,
                [action.field]: action.payload,
                errors: { ...state.errors, [action.field]: '' }  // Clear error when input changes
            };
        case actionTypes.SET_LOADING:
            return { ...state, loading: action.payload };
        case actionTypes.SET_ERRORS:
            return { ...state, errors: action.payload };
        case actionTypes.SET_API_ERROR:
            return { ...state, apiError: action.payload };
        case actionTypes.TOGGLE_PASSWORD:
            return { ...state, showPassword: !state.showPassword };
        case actionTypes.RESET_FORM:
            return initialState;
        default:
            return state;
    }
};

const Signup = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();

    // Input change handler
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: actionTypes.SET_FIELD, field: name, payload: value });
    };

    // Input validation logic
    const validateInputs = () => {
        let formErrors = { username: '', email: '', password: '' };
        let isValid = true;

        if (!state.username) {
            formErrors.username = 'User Name is required';
            isValid = false;
        }

        if (!state.email) {
            formErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(state.email)) {
            formErrors.email = 'Invalid email address';
            isValid = false;
        }

        // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,30}$/;

        if (!state.password) {
            formErrors.password = 'Password is required';
            isValid = false;
        } else if (!passwordRegex.test(state.password)) {
            formErrors.password = 'Password must be at least 6 characters, contain letters, numbers, and a special character';
            isValid = false;
        }

        dispatch({ type: actionTypes.SET_ERRORS, payload: formErrors });
        return isValid;
    };

    // Submit handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateInputs()) {
            dispatch({ type: actionTypes.SET_LOADING, payload: true });

            try {
                const { data } = await axios.post('https://agreelink.onrender.com/v1/api/auth/register', {
                    username: state.username,  // Ensure field name matches API
                    email: state.email,
                    password: state.password
                });

                // Handle success and redirect
                console.log(data);  // Log success data
                router.push('/');
            } catch (error) {
                // Log the API error for debugging
                console.error(error.response?.data);
                const errorMessage = axios.isAxiosError(error)
                    ? error.response?.data?.message || 'Registration failed'
                    : 'An error occurred. Please try again.';
                dispatch({ type: actionTypes.SET_API_ERROR, payload: errorMessage });
            } finally {
                dispatch({ type: actionTypes.SET_LOADING, payload: false });
            }
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        dispatch({ type: actionTypes.TOGGLE_PASSWORD });
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

                <div className="h-[500px] w-[400px] border mx-auto mt-9 customtwo rounded">
                    <form onSubmit={handleSubmit} className="w-full h-full">
                        <div className="w-[300px] h-[40px] mt-9 mx-auto flex flex-col">
                            <label htmlFor="username" className="mb-2">
                                User Name
                            </label>
                            <input
                                name="username"
                                placeholder="User Name"
                                className="p-2 border rounded focus:outline-none focus:border-blue-500"
                                value={state.username}
                                onChange={handleInputChange}
                            />
                            {state.errors.username && <p className="text-red-500 text-xs mt-1 mb-10">{state.errors.username}</p>}
                        </div>
                        <div className="w-[300px] h-[40px] mt-9 mx-auto flex flex-col">
                            <label htmlFor="email" className="mb-2">
                                Email
                            </label>
                            <input
                                name="email"
                                placeholder="Email"
                                className="p-2 border rounded focus:outline-none focus:border-blue-500"
                                value={state.email}
                                onChange={handleInputChange}
                            />
                            {state.errors.email && <p className="text-red-500 text-xs mt-1 mb-10">{state.errors.email}</p>}
                        </div>
                        <div className="w-[300px] h-[40px] mt-12 mb-12 mx-auto flex flex-col relative">
                            <label htmlFor="password" className="mb-2">
                                Password
                            </label>
                            <input
                                name="password"
                                type={state.showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className="p-2 border rounded focus:outline-none focus:border-blue-500"
                                value={state.password}
                                onChange={handleInputChange}
                            />
                            <div className="mb-9">
                                {state.showPassword ? (
                                    <HiOutlineEyeOff
                                        className="absolute right-2 top-10 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    />
                                ) : (
                                    <HiOutlineEye
                                        className="absolute right-2 top-10 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    />
                                )}
                            </div>
                            {state.errors.password && <p className="text-red-500 text-xs mt-1 mb-36">{state.errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={state.loading}
                            className={`flex border mx-auto justify-center rounded-lg p-3 w-[350px] mt-6 text-white-100  ${state.loading ? 'bg-gray-500' : 'bg-[#4169E1]'}`}
                        >
                            {state.loading ? (
                                <PulseLoader size={12} color={'#fff'} />
                            ) : (
                                'Sign Up'
                            )}
                        </button>

                        {state.apiError && <p className="text-red-500 text-center mt-4 mb-[100px]">{state.apiError}</p>}

                        <div className="mt-4 flex justify-center">
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
