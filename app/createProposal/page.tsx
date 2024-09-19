"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

const CreateProposal = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customFields, setCustomFields] = useState<Array<{ label: string; type: string; value: string }>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save the proposal to localStorage for simplicity
    const existingProposals = JSON.parse(localStorage.getItem("proposals") || "[]");

    const newProposal = {
      id: existingProposals.length + 1, // Generate a simple ID
      title,
      description,
      customFields, // Include custom fields in the proposal object
    };

    // Save the new proposal
    const updatedProposals = [...existingProposals, newProposal];
    localStorage.setItem("proposals", JSON.stringify(updatedProposals));

    // Redirect back to the dashboard
    router.push("/homePage/dashboard");
  };

  // Add a new custom field
  const addCustomField = () => {
    setCustomFields([...customFields, { label: "", type: "text", value: "" }]);
  };

  // Update custom field label, type, or value
  const handleCustomFieldChange = (index: number, key: string, value: string) => {
    const updatedFields = [...customFields];
    updatedFields[index] = { ...updatedFields[index], [key]: value };
    setCustomFields(updatedFields);
  };

  // Delete a custom field
  const deleteCustomField = (index: number) => {
    const updatedFields = customFields.filter((_, i) => i !== index);
    setCustomFields(updatedFields);
  };

  return (
    <>
      <Header />
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

          {/* Dynamically added custom fields */}
          <div>
            <h2 className="font-semibold mb-2">Custom Fields</h2>
            {customFields.map((field, index) => (
              <div key={index} className="mb-4 border p-4 rounded shadow-sm">
                <label htmlFor={`custom-field-label-${index}`} className="block font-semibold mb-2">
                  Field Label
                </label>
                <input
                  type="text"
                  id={`custom-field-label-${index}`}
                  className="w-full border rounded p-2 mb-2"
                  placeholder="Enter label"
                  value={field.label}
                  onChange={(e) => handleCustomFieldChange(index, "label", e.target.value)}
                  required
                />

                <label htmlFor={`custom-field-type-${index}`} className="block font-semibold mb-2">
                  Field Type
                </label>
                <select
                  id={`custom-field-type-${index}`}
                  className="w-full border rounded p-2 mb-2"
                  value={field.type}
                  onChange={(e) => handleCustomFieldChange(index, "type", e.target.value)}
                  required
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="email">Email</option>
                  <option value="checkbox">Checkbox</option>
                </select>

                <label htmlFor={`custom-field-value-${index}`} className="block font-semibold mb-2">
                  Field Value
                </label>
                <input
                  type={field.type}
                  id={`custom-field-value-${index}`}
                  className="w-full border rounded p-2"
                  placeholder={`Enter value for ${field.label}`}
                  value={field.value}
                  onChange={(e) => handleCustomFieldChange(index, "value", e.target.value)}
                  required
                />

                {/* Buttons to Edit and Delete the custom field */}
                <div className="flex justify-between mt-2">
                  <button
                    type="button"
                    className="text-white bg-red-500 p-2 rounded hover:bg-red-600 text-white-100"
                    onClick={() => deleteCustomField(index)}
                  >
                    Delete Field
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Button to add more custom fields */}
          <button
            type="button"
            onClick={addCustomField}
            className="mb-4 w-full bg-gray-200 text-blue-500 p-2 rounded hover:bg-gray-300 transition-colors"
          >
            Add Custom Field
          </button>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white-100 p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Save Proposal
          </button>
        </form>

        <button
          className="fixed bottom-6 right-6 text-white-100 bg-blue-500 p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
          onClick={() => router.push("/homePage/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </>
  );
};

export default CreateProposal;
