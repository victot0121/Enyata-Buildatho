// /root/dashboard/page.tsx
"use client"
import React, { useState } from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const router = useRouter();
    const proposals = [
        { id: 1, title: 'Proposal 1' },
        { id: 2, title: 'Proposal 2' },
        { id: 3, title: 'Proposal 3' },
        { id: 4, title: 'Proposal 4' },
        { id: 5, title: 'Proposal 5' },
        { id: 6, title: 'Proposal 6' },
        { id: 7, title: 'Proposal 7' },
        { id: 8, title: 'Proposal 8' },
        { id: 9, title: 'Proposal 9' },
    ];

    // State to track how many proposals to display
    const [visibleProposals, setVisibleProposals] = useState(3);

    // Handle "See More" button click
    const handleSeeMore = () => {
        if (visibleProposals < proposals.length) {
            setVisibleProposals((prev) => prev + 3); // Show 3 more proposals
        } else {
            router.push('/proposals'); // Navigate to the proposals page if all are displayed
        }
    };


    return (
        <>
            <Header />
            <div className="relative p-6">
                <h1 className="text-xl font-bold mb-4">My Proposals</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {proposals.slice(0, visibleProposals).map((proposal) => (
                        <div key={proposal.id} className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold">{proposal.title}</h2>
                        </div>
                    ))}
                </div>

                <div className="text-right mt-4">
                    <button
                        onClick={handleSeeMore}
                        className="text-blue-500 hover:underline"
                    >
                        {visibleProposals < proposals.length ? 'See More' : 'Go to Proposals'}
                    </button>
                </div>

                <button className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none">
                    +
                </button>
            </div>
        </>
    );
};

export default Dashboard;
