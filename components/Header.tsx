"use client";
import React, { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';

type HeaderProps = {
    apiUser?: { username: string };
};

const Header: React.FC<HeaderProps> = ({ apiUser }) => {
    const { authenticated, user } = usePrivy();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const linkedAccount = user?.linkedAccounts?.[0];
    const googleUserName = linkedAccount && 'name' in linkedAccount ? linkedAccount.name : 'User';
    const userName = apiUser?.username || googleUserName;

    return (
        <header className="pb-6 bg-white lg:pb-0">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="relative flex items-center justify-between h-16 lg:h-20">

                    <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
                        <a href="/" className="text-base font-medium text-black transition-all duration-200 hover:text-opacity-80">
                            Welcome, {userName}
                        </a>

                        <span className="h-5 w-[1px] bg-black/30 hidden lg:block"></span>

                        <span className="text-base font-medium text-black">
                            {currentTime.toLocaleTimeString()}
                        </span>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
