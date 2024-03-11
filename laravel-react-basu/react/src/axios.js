import axios from "axios";
import router from "./router";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("TOKEN");
  const role = localStorage.getItem("ROLE");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (role) {
    config.headers.Role = role; // Set role in headers if available
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("ROLE");
      router.navigate("/login");
    }
    return Promise.reject(error); // Reject all other errors
  }
);

// Function to generate UUID (Universally Unique Identifier)
const generateUUID = () => {
  // Generate a random UUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Function to get users
export const getUsers = async () => {
  try {
    const response = await axiosClient.get("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update user's location
export const updateLocation = async (latitude, longitude) => {
  try {
    await axiosClient.post("/startservice", { latitude, longitude });
  } catch (error) {
    throw error.response.data; // Throw meaningful error message
  }
};

// Function to post user location details
export const postUserLocation = async (userId, latitude, longitude) => {
  try {
    await axiosClient.post("/startservice", { userId, latitude, longitude });
  } catch (error) {
    // Check if error.response is defined before accessing its properties
    if (error.response) {
      throw error.response.data; // Throw meaningful error message from server
    } else {
      throw new Error("Failed to communicate with the server"); // Throw generic error message for network issues
    }
  }
};

// Function to get user's location
export const getLocation = async () => {
  try {
    const response = await axiosClient.get("/location");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const postShuttleForm = async (formData) => {
  try {
    // Generate UUID for shuttle_id
    const shuttleId = generateUUID();

    // Adjust form data to include shuttle_id
    const updatedFormData = { ...formData, shuttle_id: shuttleId };

    // Send form data to the backend API
    const response = await axiosClient.post("/shuttle/form", updatedFormData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get shuttle form
export const getShuttleForm = async () => {
  try {
    const response = await axiosClient.get("/shuttle/storage");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to delete shuttle form
export const deleteShuttleForm = async (shuttleId) => {
  try {
    const response = await axiosClient.delete(`/shuttle/storage/${shuttleId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const handleShuttleSelect = async (driverDetails) => {
  try {
    const response = await axiosClient.post("/driver", driverDetails);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get shuttle form
export const postReservation = async (formData) => {
  try {
    const response = await axiosClient.post("/inquire/reservation", formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getReservation = async () => {
  try {
    const response = await axiosClient.get("/student/reservation/list");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getReservationAdmin = async () => {
  try {
    const response = await axiosClient.get("/reservation");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateReservationAdmin = async (reservationId, newData) => {
  try {
    const response = await axiosClient.put(
      `/reservation/${reservationId}`,
      newData
    );
    return response.data;
  } catch (error) {
    throw error.response.data; // Throw meaningful error message
  }
};

export const getRegisteredShuttles = async () => {
  try {
    const response = await axiosClient.get("/dashboard");
    return response.data.shuttleCount;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOnStandShuttles = async () => {
  try {
    const response = await axiosClient.get("/dashboard");
    return response.data.onStandCount;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOnServiceShuttles = async () => {
  try {
    const response = await axiosClient.get("/dashboard");
    return response.data.onServiceCount;
  } catch (error) {
    throw error.response.data;
  }
};

export const getRegisteredDrivers = async () => {
  try {
    const response = await axiosClient.get("/dashboard");
    return response.data.registeredDriversCount;
  } catch (error) {
    throw error.response.data;
  }
};

export const getRegisteredStudents = async () => {
  try {
    const response = await axiosClient.get("/dashboard");
    return response.data.registeredStudentsCount;
  } catch (error) {
    throw error.response.data;
  }
};

export default axiosClient;
