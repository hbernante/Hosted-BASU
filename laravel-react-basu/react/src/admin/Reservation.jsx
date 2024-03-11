import React, { useState, useEffect } from "react";
import PageComponent from "../components/PageComponent";
import {
  getReservationAdmin,
  getShuttleForm,
  updateReservationAdmin,
} from "../axios"; // Import the functions to get and update reservations data
import TButton from "../components/core/TButton";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default function StudentReservation() {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [shuttles, setShuttles] = useState([]);
  const [selectedShuttleId, setSelectedShuttleId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getReservationAdmin();
        if (response && Array.isArray(response)) {
          setReservations(response);
        } else {
          console.error("Invalid data format received:", response);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    const fetchShuttles = async () => {
      try {
        // Fetch available shuttles
        const response = await getShuttleForm();
        if (!response || !response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid data format received");
        }
        setShuttles(response.data);
        console.log("Fetched shuttles:", response.data); // Log the fetched shuttles
      } catch (error) {
        console.error("Error fetching shuttles:", error);
      }
    };

    fetchReservations();
    fetchShuttles();
  }, []);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleUpdate = async () => {
    try {
      // Assign the selected shuttle ID to the reservation
      const updatedReservation = {
        ...selectedReservation,
        shuttle: selectedShuttleId, // Use 'shuttle' instead of 'shuttle_id'
      };

      const responseReservation = await updateReservationAdmin(
        selectedReservation.id,
        updatedReservation
      );

      if (responseReservation) {
        // Update the reservations list with the updated reservation
        const updatedReservations = reservations.map((reservation) =>
          reservation.id === selectedReservation.id
            ? updatedReservation
            : reservation
        );
        setReservations(updatedReservations);

        // Update the selected reservation with the selected shuttle ID
        setSelectedReservation(updatedReservation); // Update selectedReservation here
      }

      // Update the selected shuttle with the reservation ID
      const selectedShuttle = shuttles.find(
        (shuttle) => shuttle.id === selectedShuttleId
      );
      if (selectedShuttle) {
        const updatedShuttle = {
          ...selectedShuttle,
          reservation_id: selectedReservation.id,
        };

        const responseShuttle = await updateShuttleForm(
          selectedShuttleId,
          updatedShuttle
        );

        if (responseShuttle) {
          // Update the shuttles list with the updated shuttle
          const updatedShuttles = shuttles.map((shuttle) =>
            shuttle.id === selectedShuttleId ? updatedShuttle : shuttle
          );
          setShuttles(updatedShuttles);
        }
      }

      setModalOpen(false);
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const handleFieldChange = (field, value) => {
    setSelectedReservation({
      ...selectedReservation,
      [field]: value,
    });
  };

  const openModal = (reservation) => {
    setSelectedReservation(reservation);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <PageComponent>
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
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <span className="sr-only">Checkbox</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation.name}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${
                      reservation.status === "Pending"
                        ? "text-yellow-500"
                        : reservation.status === "Approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {reservation.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <TButton
                      onClick={() => openModal(reservation)}
                      className="font-mono hover:underline"
                      color="indigo"
                    >
                      Details <CalendarIcon className=" ml-2 w-4 h-5" />
                    </TButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
              <div className="bg-white px-8 py-6 sm:p-6">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  id="modal-title"
                >
                  Reservation Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Reason
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.reason}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.description}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.location}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Landmark
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.landmark}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Time
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {formatDateTime(selectedReservation.start_time)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Time
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {formatDateTime(selectedReservation.end_time)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Passengers
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.passengers}
                    </p>
                  </div>
                </div>
                <div className="mt-10">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleFieldChange("status", "Approved")}
                      className={`p-2 block w-full border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        selectedReservation.status === "Approved"
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleFieldChange("status", "Denied")}
                      className={`p-2 block w-full border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        selectedReservation.status === "Denied"
                          ? "bg-red-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Deny
                    </button>
                  </div>
                </div>
                <div className="mt-10">
                  <label className="block text-sm font-medium text-gray-700">
                    Assign Shuttle
                  </label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={selectedShuttleId}
                    onChange={(e) => setSelectedShuttleId(e.target.value)}
                  >
                    <option value="">Select a shuttle</option>
                    {shuttles.map((shuttle) => (
                      <option key={shuttle.id} value={shuttle.id}>
                        {shuttle.shuttle_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
                <button
                  onClick={handleUpdate}
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update
                </button>
                <button
                  onClick={closeModal}
                  className="mt-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageComponent>
  );
}
