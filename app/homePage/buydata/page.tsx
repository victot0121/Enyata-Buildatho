// /root/buydata/page.tsx
"use client"
import React from 'react';
import Header from '@/components/Header';

const BuyData = () => {

  const proposals = [
    { id: 1, title: 'Proposal 1' },
    { id: 2, title: 'Proposal 2' },
    { id: 3, title: 'Proposal 3' },
    { id: 4, title: 'Proposal 4' },
    { id: 5, title: 'Proposal 5' },
    { id: 6, title: 'Proposal 6' },
];


  return (
    <>
      <Header />
      <div className="relative p-6">
                <h1 className="text-xl font-bold mb-4">My Proposals</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {proposals.slice(0, 3).map((proposal) => (
                        <div key={proposal.id} className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold">{proposal.title}</h2>
                        </div>
                    ))}
                </div>

                <div className="text-right mt-4">
                    <a href="/proposals" className="text-blue-500 hover:underline">See More</a>
                </div>

                <button className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none">
                    +
                </button>
            </div>
    </>
  );
};

export default BuyData;
