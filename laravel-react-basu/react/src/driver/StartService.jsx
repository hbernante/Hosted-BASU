import React from 'react';
import PageComponent from '../components/PageComponent';
import MapComponent from '../components/MapComponent';
import { postUserLocation } from '../axios'; // Import the postUserLocation function
import { useStateContext } from '../contexts/ContextProvider';
export default function StartService() {
  const { currentUser } = useStateContext(); // Access currentUser from the context
  const userId = currentUser.id; // Assuming you have the user's ID stored in currentUser

  // Function to get user's location and post it to the backend
  const getUserLocationAndPost = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      postUserLocation(userId, latitude, longitude) // Pass userId to postUserLocation function
        .then(() => {
          console.log("User location posted successfully");
        })
        .catch((error) => {
          console.error("Error posting user location:", error);
        });
    });
  };

  // Call the function to get and post user's location when the component mounts
  React.useEffect(() => {
    // Assuming you have the userId stored in localStorage
    const userId = localStorage.getItem("userId");
    if (userId) {
      getUserLocationAndPost(userId); // Pass userId as a parameter
    }
  }, [])

  return (
    <PageComponent>
      <h1>Start Service Driver</h1>
      <MapComponent />
    </PageComponent>
  );
}
