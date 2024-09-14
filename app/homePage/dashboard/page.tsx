"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";

const Dashboard = () => {
    const router = useRouter();

    const [proposals, setProposals] = useState([
        { id: 1, title: 'Proposal 1', p: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
        { id: 2, title: 'Proposal 2', p: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
        { id: 3, title: 'Proposal 3', p: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
        { id: 4, title: 'Proposal 4', p: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
        { id: 5, title: 'Proposal 5', p: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
        { id: 6, title: 'Proposal 6', p: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
        { id: 7, title: 'Proposal 7', p: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
        { id: 8, title: 'Proposal 8', p: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
    ]);
    

    const [visibleProposals, setVisibleProposals] = useState(3);
    const [editingProposalId, setEditingProposalId] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState("");

    // Handle "See More" button click
    const handleSeeMore = () => {
        if (visibleProposals < proposals.length) {
            setVisibleProposals((prev) => prev + 3); // Show 3 more proposals
        } else {
            router.push("/proposals"); // Navigate to the proposals page if all are displayed
        }
    };

    // Handle delete functionality
    const handleDelete = (id: number) => {
        setProposals(proposals.filter((proposal) => proposal.id !== id));
    };

    // Handle edit functionality
    const handleEdit = (proposal: any) => {
        setEditingProposalId(proposal.id);
        setEditedTitle(proposal.title); // Set the initial value to the current proposal title
    };

    // Handle title save functionality
    const handleSave = (id: number) => {
        setProposals((prevProposals) =>
            prevProposals.map((proposal) =>
                proposal.id === id ? { ...proposal, title: editedTitle } : proposal
            )
        );
        setEditingProposalId(null); // Exit edit mode
    };

    // Handle title click to navigate to a detailed page
    const handleTitleClick = (id: number) => {
        router.push(`/proposals/${id}`); // Navigate to /proposals/[id]
    };

    return (
        <>
            <Header />
            <div className="relative p-6">
                <h1 className="text-xl font-bold mb-4">My Proposals</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {proposals.slice(0, visibleProposals).map((proposal) => (
                        <div
                            key={proposal.id}
                            className="flex justify-between bg-white p-4 rounded-lg shadow-md"
                        >
                            {editingProposalId === proposal.id ? (
                                // Edit Mode
                                <input
                                    type="text"
                                    className="text-lg font-semibold border p-2 rounded"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                            ) : (
                                // View Mode: Clickable title to navigate to detail page
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
                                    className="cursor-pointer hover:text-red-500"
                                    onClick={() => handleDelete(proposal.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-right mt-4">
                    <button
                        onClick={handleSeeMore}
                        className="text-blue-500 hover:underline"
                    >
                        {visibleProposals < proposals.length ? "See More" : "Go to Proposals"}
                    </button>
                </div>

                <button className="fixed bottom-6 right-6 text-white bg-blue-500 p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none">
                    +
                </button>
            </div>
        </>
    );
};

export default Dashboard;
