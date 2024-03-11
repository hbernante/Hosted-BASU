import React, { useState, useEffect } from "react";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import { InboxArrowDownIcon } from "@heroicons/react/24/outline";
import { getReservation } from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function StudentReservation() {
  const { currentUser } = useStateContext();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getReservation();
        if (response && Array.isArray(response)) {
          const userReservations = response.filter(
            (reservation) => reservation.email === currentUser.email
          );
          setReservations(userReservations);
        } else {
          console.error("Invalid data format received:", response);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [currentUser.email]); // Depend on currentUser.email to refetch reservations when email changes

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

  const handleDelete = async (reservationId) => {
    try {
      // Perform delete operation
      // Update the reservation list after deletion
      const updatedReservations = reservations.filter(
        (reservation) => reservation.id !== reservationId
      );
      setReservations(updatedReservations);
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <PageComponent
      buttons={
        <TButton color="green" to="/inquire/reservation">
          <InboxArrowDownIcon className="h-6 w-6 mr-2" /> Inquire a Reservation
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
                  Starting Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Ending Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
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
                    <div className="text-sm font-medium text-gray-900">
                      {formatDateTime(reservation.start_time)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDateTime(reservation.end_time)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="font-medium text-blue-600 dark:blue-red-500 hover:underline"
                      onClick={() =>
                        console.log(
                          "Passengers type:",
                          typeof reservation.passengers
                        )
                      }
                    >
                      Overview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageComponent>
  );
}
