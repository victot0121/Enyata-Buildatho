"use client";

import React, { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import googleLogo from '@/assets/googleLogo.svg';
import Image from 'next/image';

// Define types for the user object if needed
type User = {
    name?: string;
    email?: string;
    [key: string]: any;
};

const GoogleButton = () => {
    const { login, authenticated, user } = usePrivy();
    const router = useRouter();

    const handleLogin = async () => {
        // Prevent login if the user is already authenticated
        if (authenticated) {
            alert("You are already logged in.");
            return;
        }

        try {
            await login(); // Ensure login is awaited
            router.push('/homePage/dashboard'); // Route after successful login
        } catch (error) {
            alert("Login failed");
            console.error(error);
        }
    };


    // Handle redirect when authenticated and user details are available
    useEffect(() => {
        if (authenticated && user?.email) {
            alert("Welcome!");
        }
    }, [authenticated, user, router]);

    return (
        <div
            className="flex border mx-auto shadow-custom justify-center rounded-lg p-2 max-w-xs cursor-pointer"
            onClick={handleLogin}
        >
            <Image src={googleLogo} alt="Google Logo" className="h-12" />
            <p className="mt-3 pl-4 text-sm">Login with Google</p>
        </div>
    );
};

export default GoogleButton;
