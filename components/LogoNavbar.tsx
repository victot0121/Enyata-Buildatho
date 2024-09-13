import React from 'react';
import leftarrow from '@/assets/chevron-left.svg';
import Image from 'next/image';

const LogoNavbar = () => {
  return (
    <div className="w-[950px] flex justify-between items-center px-4 mt-8">
      {/* First div with image and text */}
      <div className="flex items-center space-x-3">
        <Image src={leftarrow} alt="left side" className="w-6" />
        <p className="text-[#4169E1] text-lg">Home</p>
      </div>

      {/* Second div with the page text */}
      <div className="py-2 px-5 bg-blue-700 text-white rounded mt-2">
        <p className="text-sm text-white-100">Sign Up</p>
      </div>
    </div>
  );
}

export default LogoNavbar;
