import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import PageComponent from "../components/PageComponent";

const ReservationForm = () => {
  const { currentUser } = useStateContext();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [reservationDate, setReservationDate] = useState("");
  const [reason, setReason] = useState("");
  const [passengerNames, setPassengerNames] = useState([""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  const handlePassengerNameChange = (index, value) => {
    const updatedPassengerNames = [...passengerNames];
    updatedPassengerNames[index] = value;
    setPassengerNames(updatedPassengerNames);
  };

  const addPassenger = () => {
    setPassengerNames([...passengerNames, ""]);
  };

  const removePassenger = (index) => {
    const updatedPassengerNames = [...passengerNames];
    updatedPassengerNames.splice(index, 1);
    setPassengerNames(updatedPassengerNames);
  };

  return (
    <PageComponent>
      <div className="max-w-lg mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="reservationDate"
            >
              Reservation Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reservationDate"
              type="date"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="reason"
            >
              Reason for Reservation
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reason"
              type="text"
              placeholder="Reason for Reservation"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="passengerNames"
            >
              Passenger Names
            </label>
            {passengerNames.map((passenger, index) => (
              <div key={index} className="flex items-center mt-1">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder={`Passenger ${index + 1}`}
                  value={passenger}
                  onChange={(e) =>
                    handlePassengerNameChange(index, e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removePassenger(index)}
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPassenger}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Passenger
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </PageComponent>
  );
};

export default ReservationForm;
