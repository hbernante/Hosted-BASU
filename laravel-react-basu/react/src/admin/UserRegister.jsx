import { useState } from "react";
import axiosClient from "../axios.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import {
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent.jsx";
import TButton from "../components/core/TButton.jsx";

export default function UserRegister() {
  const { currentUser, setCurrentUser, setUserToken } = useStateContext();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({ __html: "" });
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // State to control the visibility of the notification
  const [role, setRole] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    // Disable the button and set loading state
    setLoading(true);

    axiosClient
      .post("/signup", {
        name: fullName,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role,
      })
      .then(({ data }) => {
        setShowNotification(true); // Show notification after successful account creation
        //Clear form fields:
        setFullName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        if (!currentUser) {
          setCurrentUser(data.user);
          setUserToken(data.token);
        }
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          console.log(finalErrors);
          setError({ __html: finalErrors.join("<br>") });
        }
        console.error(error);
      })
      .finally(() => {
        // Enable the button and reset loading state
        setLoading(false);
      });
  };

  return (
    <PageComponent
      buttons={
        <TButton color="indigo" to="/users">
          <ChevronDoubleLeftIcon className="h-6 w-6 mr-2" />
          Back to Account List
        </TButton>
      }
    >
      <div className="sm:mx-auto sm:w-full ">
        <h2 className="mt-2 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 font-mono">
          Register{" "}
          <span className={`text-${role === "1" ? "red" : role === "2" ? "blue" : "yellow"}-500`}>
            {role === "1" && "Admin"}
            {role === "2" && "Student"}
            {role === "3" && "Driver"}
          </span>{" "}
          Account
        </h2>
        {error.__html && (
          <div
            className="bg-red-500 mt-4 rounded py-2 px-3 text-white font-mono text-center"
            dangerouslySetInnerHTML={error}
          ></div>
        )}
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <form
          onSubmit={onSubmit}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div className="mt-10">
            <fieldset className="border border-gray-400 rounded-md p-2">
              <label
                htmlFor="full-name"
                className="block text-bold underline font-medium leading-6 text-gray-900 mb-2 text-center"
              >
                Assign a Role:
              </label>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center font-mono">
                  <input
                    id="student"
                    type="radio"
                    className="h-4 w-4 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 text-indigo-600"
                    checked={role === "2"}
                    onChange={() => setRole("2")}
                  />
                  <label
                    htmlFor="student"
                    className="ml-2 text-sm text-gray-900"
                  >
                    Student
                  </label>
                </div>
                <div className="flex items-center font-mono">
                  <input
                    id="driver"
                    type="radio"
                    className="h-4 w-4 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 text-indigo-600"
                    checked={role === "3"}
                    onChange={() => setRole("3")}
                  />
                  <label
                    htmlFor="driver"
                    className="ml-2 text-sm text-gray-900"
                  >
                    Driver
                  </label>
                </div>
                <div className="flex items-center font-mono">
                  <input
                    id="admin"
                    type="radio"
                    className="h-4 w-4 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 text-indigo-600"
                    checked={role === "1"}
                    onChange={() => setRole("1")}
                  />
                  <label htmlFor="admin" className="ml-2 text-sm text-gray-900">
                    Admin
                  </label>
                </div>
              </div>
            </fieldset>
            <div className="flex justify-between mt-2">
              <div className="w-full">
                {role === "2" && (
                  <p className="text-sm text-gray-600">
                    Registered students functions are:
                    <span className="block">
                      <b> ∘ Live Location</b> tracking of In-Service Shuttle.
                    </span>
                    <span className="block">
                      <b> ∘ Submit Reservation Form</b> for Shuttle Reservation.
                    </span>
                    <span className="block">
                      <b> ∘ View Reservation Status</b> for Shuttle Reservation.
                    </span>
                  </p>
                )}
                {role === "3" && (
                  <p className="text-sm text-gray-600">
                    Registered drivers functions are:
                    <span className="block">
                      <b> ∘ Transmit GPS Location</b> for Shuttle Service.
                    </span>
                    <span className="block">
                      <b> ∘ Track</b> other active Shuttle Service.
                    </span>
                  </p>
                )}
                {role === "1" && (
                  <p className="text-sm text-gray-600">
                    Registered admins functions are:
                    <span className="block">
                      <b> ∘ Create Accounts</b> for all users.
                    </span>
                    <span className="block">
                      <b> ∘ Live Location</b> tracking of In-Service Shuttle.
                    </span>
                    <span className="block">
                      <b> ∘ Manage Reservation Inquiry</b> using the digitized
                      System.
                    </span>
                    <span className="block">
                      <b> ∘ Manage the System</b>.
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="full-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="full-name"
                name="name"
                type="text"
                required
                value={fullName}
                onChange={(ev) => setFullName(ev.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Full Name"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="APC Issued Email Address"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                // autoComplete="current-password"
                required
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password-confirmation"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="password-confirmation"
                name="password_confirmation"
                type="password"
                required
                value={passwordConfirmation}
                onChange={(ev) => setPasswordConfirmation(ev.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password Confirmation"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading} // Disable the button when loading
              className={`flex w-full justify-center rounded-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed" // Change color and cursor when loading
                  : "bg-blue-600 hover:bg-blue-500"
              } px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        {/* Notification Modal */}
        {showNotification && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="bg-white rounded-lg p-8 z-10">
              <p className="text-xl text-gray-900">
                Account created successfully!
              </p>
              <button
                onClick={() => setShowNotification(false)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </PageComponent>
  );
}
