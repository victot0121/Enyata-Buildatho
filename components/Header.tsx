import React from 'react';

const Header = () => {
    return (
        <header className="pb-6 bg-white lg:pb-0">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex-shrink-0 font-bold uppercase">
                        Welcome , <span className="text-blue-500  "> Oyiga Victor </span>
                    </div>
                    <a
                        href="#"
                        title=""
                        className="items-center justify-center  px-4 py-3 ml-10 text-base font-bold text-white transition-all duration-200  border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700" role="button">
                        welcome !!!!!
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default Header;
