// "use client";

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { SidebarLinks } from '@/constants/index';
// import { usePathname } from 'next/navigation';







// const Sidebar = () => {
//     const pathname = usePathname();


//     return (
//         <div className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8 text-white  sm:p-4 xl:p-6 2xl:w-[355px]">
//             <nav className="flex flex-col gap-4">
//                 <Link href="/" className='mb-12 cursor-pointer items-center gap-2'>
//                     <h1 className="text-blue-500">Logo</h1>
//                 </Link>
//                 {SidebarLinks.map((item) => {
//                     const isActive = pathname === item.route;
//                     const Icon = item.Icon

//                     return (
//                         <Link
//                             key={item.route}
//                             href={item.route}
//                             className={`flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start ${isActive ? 'text-white-100 bg-blue-500' : 'text-blue-500'}`}
//                         >
                           
//                             <Icon />
//                             <span>{item.label}</span>
//                             <Image src={item.icons} alt={item.icons} />
//                         </Link>
//                     );
//                 })}
//             </nav>
//             <footer className=''>
//                 Login Out
//             </footer>
//         </div>
//     );
// };

// export default Sidebar;
"use client";

import React from 'react';
import Link from 'next/link';
import { SidebarLinks } from '@/constants/index';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

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
            <footer className=''>
                Log Out
            </footer>
        </div>
    );
};

export default Sidebar;
