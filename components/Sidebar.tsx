"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SidebarLinks } from '@/constants/index';
import { usePathname, useRouter } from 'next/navigation';
import { TbArrowBack } from "react-icons/tb";
import { usePrivy } from '@privy-io/react-auth'; // Import the usePrivy hook


const Sidebar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = usePrivy(); // Destructure the logout function from usePrivy


    // Check if the user is logged in by looking for a token in localStorage
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (token) {
            setIsLoggedIn(true)
        }
    }, [])

    // Handle Logout Function
    const handleLogout = async () => {
        try {
            // Clear authentication data from localStorage
            localStorage.removeItem('authToken');

            // Call the Privy logout function
            await logout();

            // Set login state to false
            setIsLoggedIn(false);

            // Redirect to the login page
            router.push('/');
        } catch (error) {
            alert("Logout failed");
        }
    };

    return (
        <div className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8 text-white sm:p-4 xl:p-6 2xl:w-[355px]">
            <nav className="flex flex-col gap-4">
                <Link href="/" className='mb-12 cursor-pointer items-center gap-2'>
                    <h1 className="text-blue-500">Logo</h1>
                </Link>
                {SidebarLinks.map((item) => {
                    const isActive = pathname === item.route;
                    const Icon = item.Icon;

                    return (
                        <Link
                            key={item.route}
                            href={item.route}
                            className={`flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start ${isActive ? 'text-white-100 bg-blue-500' : 'text-blue-500'}`}
                        >
                            <Icon />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
            {isLoggedIn ? null : (
                <footer className='p-4'>
                    {/* Logout button */}
                    <button className="w-full flex gap-3 text-left p-3 bg-blue-600 text-white-100 rounded-lg hover:bg-red-600" onClick={handleLogout}>
                        <TbArrowBack className='mt-1' color='white' />
                        Log Out
                    </button>
                </footer>
            )}
        </div>
    );
};

export default Sidebar;
