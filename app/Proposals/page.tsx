"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Proposals = () => {
    const [proposals, setProposals] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const savedProposals = JSON.parse(localStorage.getItem("proposals") || "[]");
        setProposals(savedProposals)
    }, [])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Proposals</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {proposals.map((proposal) => (
                    <div key={proposal.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{proposal.title}</h2>
                            <p className="text-gray-600">{proposal.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="fixed bottom-6 right-6 text-white-100 bg-blue-500 p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
                onClick={() => router.push("/homePage/dashboard")}
            >
                Back to deshboard
            </button>
        </div>
    );
};

export default Proposals;
