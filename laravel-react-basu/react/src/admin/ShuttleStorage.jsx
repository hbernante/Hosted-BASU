import React, { useState, useEffect } from "react";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import { InboxArrowDownIcon } from "@heroicons/react/24/outline";
import { deleteShuttleForm, getShuttleForm } from "../axios"; // Import the function to get and delete shuttle data

export default function ShuttleStorage() {
  const [shuttles, setShuttles] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [shuttleIdToDelete, setShuttleIdToDelete] = useState(null);

  useEffect(() => {
    // Fetch shuttle data when the component mounts
    const fetchShuttles = async () => {
      try {
        const shuttleData = await getShuttleForm();
        setShuttles(shuttleData.data); // Assuming shuttleData is an object with a 'data' property containing the array
      } catch (error) {
        console.error("Error fetching shuttles:", error);
      }
    };

    fetchShuttles();
  }, []); // Empty dependency array ensures the effect runs only once

  // Function to handle shuttle deletion
  const handleDelete = async () => {
    try {
      // Send delete request to delete the shuttle
      await deleteShuttleForm(shuttleIdToDelete);
      // Update the shuttle list after deletion
      const updatedShuttles = shuttles.filter((shuttle) => shuttle.id !== shuttleIdToDelete);
      setShuttles(updatedShuttles);
      // Close the confirmation modal
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Error deleting shuttle:", error);
    }
  };

  return (
    <PageComponent
      buttons={
        <TButton color="green" to="/shuttle/form">
          <InboxArrowDownIcon className="h-6 w-6 mr-2" /> Import a new Shuttle Vehicle
        </TButton>
      }
    >
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="max-w-6xl mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <span className="sr-only">Checkbox</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Plate Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Landmark
                </th>
                <th scope="col" className="px-6 py-3">
                  Capacity
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Map over shuttle data to render table rows */}
              {shuttles.map((shuttle) => (
                <tr
                  key={shuttle.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <span className="sr-only">Checkbox</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{shuttle.shuttle_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{shuttle.shuttle_plate_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{shuttle.shuttle_color}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{shuttle.shuttle_landmark}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{shuttle.passenger_capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{shuttle.working_condition}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setShowConfirmationModal(true);
                        setShuttleIdToDelete(shuttle.id);
                      }}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Confirmation modal */}
        {showConfirmationModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 bg-black opacity-25"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-lg w-96">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Are you sure you want to delete this shuttle?
                  </p>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setShowConfirmationModal(false)}
                      className="text-gray-600 dark:text-gray-400 mr-4 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageComponent>
  );
}
