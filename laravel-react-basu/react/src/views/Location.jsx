import React, { useState } from "react"; // Import useState hook
import PageComponent from "../components/PageComponent";
import { useStateContext } from "../contexts/ContextProvider";
import TButton from "../components/core/TButton";
import { Link } from "react-router-dom";

export default function Location() {
  const { location, setLocation } = useStateContext();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  // Function to update location state with new lat and lng values
  const updateLocation = () => {
    setLocation({
      ...location, // Preserve other properties of location object
      lat: lat, // Update lat property with new value
      lng: lng, // Update lng property with new value
    });
    console.log("Updated Location:", { lat: lat, lng: lng });
  };

  return (
    <PageComponent>
      <div>
        <label>Latitude:</label>
        <input
          type="text"
          value={lat || ""}
          onChange={(e) => setLat(e.target.value)}
        />
      </div>
      <div>
        <label>Longitude:</label>
        <input
          type="text"
          value={lng || ""}
          onChange={(e) => setLng(e.target.value)}
        />
      </div>
      <Link to='/location/map'>
        <TButton onClick={updateLocation}>Track Shuttle Vehicle</TButton>
      </Link>
    </PageComponent>
  );
}
