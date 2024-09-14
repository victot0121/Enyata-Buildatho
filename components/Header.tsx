import React from 'react';

const Header = () => {
    return (
        <header className="pb-6 bg-white lg:pb-0">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16 lg:h-20">
                   
                   

                    <div className="flex-shrink-0 font-bold uppercase">
                        Welcome , <span className="text-blue-500  "> Oyiga Victor </span>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
