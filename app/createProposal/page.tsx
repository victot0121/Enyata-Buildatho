"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateProposal = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save the proposal to localStorage for simplicity
    const existingProposals = JSON.parse(localStorage.getItem("proposals") || "[]");

    const newProposal = {
      id: existingProposals.length + 1, // Generate a simple ID
      title,
      description,
    };

    // Save the new proposal
    const updatedProposals = [...existingProposals, newProposal];
    localStorage.setItem("proposals", JSON.stringify(updatedProposals));

    // Redirect back to the dashboard
    router.push("/homePage/dashboard");
  };

  return (
    <div className="max-w-lg mt-[60px] mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Create New Proposal</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-2">
            Proposal Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-2">
            Proposal Description
          </label>
          <textarea
            id="description"
            className="w-full border rounded p-2"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white-100 p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Save Proposal
        </button>
      </form>
    </div>
  );
};

export default CreateProposal;
