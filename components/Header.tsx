"use client";
import React, { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';

// Define types for the user object
type User = {
    id?: string;
    createdAt?: Date;
    linkedAccounts?: Array<{
        provider: string;
        name?: string;
        email?: string;
        imageUrl?: string;
    }>;
    email?: string;
    phone?: string;
    [key: string]: any;
};

const Header = () => {
    const { authenticated, user } = usePrivy() as {
        authenticated: boolean;
        user?: User;
    };

    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer); // Clear interval on component unmount
    }, []);


    // Get user name, email, and image from linked accounts (like Google)
    const userName = user?.linkedAccounts?.[0]?.name || 'User';

    return (
        <header className="pb-6 bg-white lg:pb-0">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex items-center">
                        <div className="font-bold uppercase">
                            Welcome,
                            <span className="text-blue-500">
                                {authenticated ? userName : 'Login Please'}
                            </span>
                        </div>
                    </div>
                    <div>
                        {/* Display current time and date */}
                        <div className="text-sm text-blue-500">
                            {currentTime.toLocaleTimeString()} -{' '}
                            {currentTime.toLocaleDateString()}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
