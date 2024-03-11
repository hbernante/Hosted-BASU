import React, { useState } from "react";
import PageComponent from "../components/PageComponent";
import { handleShuttleSelect } from "../axios";

export default function ShuttleSelect() {
  const [name, setName] = useState("");
  const [shuttle, setShuttle] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [color, setColor] = useState("");
  const [model, setModel] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const driverDetails = { name, shuttle, license_plate: licensePlate, color, model };
    try {
      // Call the handleShuttleSelect function with the form data
      await handleShuttleSelect(driverDetails);
      console.log("Shuttle form submitted successfully!");
      // Optionally, you can navigate to another page or perform other actions after successful submission
    } catch (error) {
      setError("Failed to submit shuttle form. Please try again.");
      console.error("Error submitting shuttle form:", error);
    }
  };

  return (
    <PageComponent>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="shuttle" className="block text-gray-700">
            Shuttle:
          </label>
          <input
            type="text"
            id="shuttle"
            value={shuttle}
            onChange={(e) => setShuttle(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="licensePlate" className="block text-gray-700">
            License Plate:
          </label>
          <input
            type="text"
            id="licensePlate"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="color" className="block text-gray-700">
            Color:
          </label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="block text-gray-700">
            Model:
          </label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </PageComponent>
  );
}
