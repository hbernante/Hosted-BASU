import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axiosClient from "../axios.js";
import LoadingModal from "../styling/LoadingModal.jsx"; // Adjust the path as per your project structure

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  role: null,
  setCurrentUser: () => {},
  setUserToken: () => {},
  setRole: () => {},
  setLocation: () => {},
  location: {
    lat: null,
    lng: null,
  },


});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("TOKEN") || ""
  );
  const [role, setRole] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(true);

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
    _setUserToken(token);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const storedToken = localStorage.getItem("TOKEN");
      if (storedToken) {
        try {
          const response = await axiosClient.get("/me");
          setCurrentUser(response.data);
          setRole(response.data.role);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("TOKEN");
    if (storedToken) _setUserToken(storedToken);
  }, []);

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        role,
        setRole,
        location,
        setLocation,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
