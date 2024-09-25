"use client";


import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";

const Dashboard = () => {
    const router = useRouter();

    const [proposals, setProposals] = useState<any[]>([]);
    const [visibleProposals, setVisibleProposals] = useState(3);
    const [editingProposalId, setEditingProposalId] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState("");

    // Fetch proposals from localStorage on component mount
    useEffect(() => {
        const savedProposals = JSON.parse(localStorage.getItem("proposals") || "[]");
        setProposals(savedProposals);
    }, []);

    // Handle "See More" button click
    const handleSeeMore = () => {
        if (visibleProposals < proposals.length) {
            setVisibleProposals((prev) => prev + 3); // Show 3 more proposals
        } else {
            router.push("/Proposals");
        }
    };

    // Handle delete functionality
    const handleDelete = (id: number) => {
        const updatedProposals = proposals.filter((proposal) => proposal.id !== id);
        setProposals(updatedProposals);
        localStorage.setItem("proposals", JSON.stringify(updatedProposals)); // Update localStorage
    };

    // Handle edit functionality
    const handleEdit = (proposal: any) => {
        setEditingProposalId(proposal.id);
        setEditedTitle(proposal.title);
    };

    // Handle title save functionality
    const handleSave = (id: number) => {
        const updatedProposals = proposals.map((proposal) =>
            proposal.id === id ? { ...proposal, title: editedTitle } : proposal
        );
        setProposals(updatedProposals);
        localStorage.setItem("proposals", JSON.stringify(updatedProposals)); // Update localStorage
        setEditingProposalId(null); // Exit edit mode
    };

    // Handle title click to navigate to a detailed page
    const handleTitleClick = (id: number) => {
        router.push(`/ProposalDetail/${id}`);
    };

    return (
        <>
            <Header />
            <div className="relative p-6">
                <h1 className="text-sm md:text-xl font-bold mb-4">My Proposals</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {proposals.slice(0, visibleProposals).map((proposal) => (
                        <div
                            key={proposal.id}
                            className="flex justify-between bg-white p-4 rounded-lg shadow-md"
                        >
                            {editingProposalId === proposal.id ? (
                                <input
                                    type="text"
                                    className="text-lg font-semibold border p-2 rounded"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                            ) : (
                                <h2
                                    className="text-lg font-semibold cursor-pointer hover:text-blue-500"
                                    onClick={() => handleTitleClick(proposal.id)}
                                >
                                    {proposal.title}
                                </h2>
                            )}

                            <div className="flex gap-3 mt-2">
                                {editingProposalId === proposal.id ? (
                                    <button
                                        className="text-green-500 hover:text-green-700"
                                        onClick={() => handleSave(proposal.id)}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <BiSolidEdit
                                        className="cursor-pointer hover:text-blue-500"
                                        onClick={() => handleEdit(proposal)}
                                    />
                                )}
                                <RiDeleteBin7Line
                                    className="text-sm md:text-xl cursor-pointer hover:text-red-500"
                                    onClick={() => handleDelete(proposal.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-right mt-4">
                    <button
                        onClick={handleSeeMore}
                        className="text-sm md:text-xl text-blue-500 hover:underline"
                    >
                        {visibleProposals < proposals.length ? "See More" : "Go to Proposals"}
                    </button>
                </div>

                {/* Floating "+" button */}
                <button
                    className="fixed text-sm md:text-xl bottom-6 right-6 text-white-100 bg-blue-500 p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
                    onClick={() => router.push("/createProposal")} // Navigate to the create proposal page
                >
                    +
                </button>
            </div>
        </>
    );
};

export default Dashboard;
