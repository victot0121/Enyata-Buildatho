import React from 'react'
import Image from 'next/image'
import leftSection from '@/assets/left-section.jpg'

const Headerbox = ({ type = 'title', title, user, subtext }: HeaderBoxProps) => {
  return (
    <div>
      {title}
      {type === 'greeting' && (
        <span>
          &nbsp; {user}
        </span>
      )}
      <p>{subtext}</p>
    </div>
  );
};

export default Headerbox