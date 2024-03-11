import React, { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";

import { Marker, Popup, useMapEvents } from "react-leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { useStateContext } from "../contexts/ContextProvider";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

export default function Map() {
  const { location } = useStateContext();
  const pusherKey = process.env.VITE_PUSHER_APP_KEY;
  const pusherCluster = process.env.VITE_PUSHER_APP_CLUSTER;

  console.log("Pusher key:", pusherKey);
  console.log("Pusher cluster:", pusherCluster);

  // Set up Pusher event listener
  useEffect(() => {
    console.log("Initializing Pusher...");
    console.log("Pusher key:", pusherKey);
    console.log("Pusher cluster:", pusherCluster);

    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
    });

    const channel = pusher.subscribe("location");
    channel.bind("SendLocation", function(data) {
      console.log("Listening for Pusher events:", data);
      // Handle Pusher events here
    });

    // Clean up Pusher subscription when component unmounts
    return () => {
      pusher.unsubscribe("location");
    };
  }, []);

  navigator.geolocation.getCurrentPosition(
    (success) => {
      console.log(success);
    },
    (error) => {
      console.error(error);
    }
  );

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(location);
        map.flyTo([location.lat, location.lng], map.getZoom());
      },
    });

    return position ? (
      <Marker position={[location.lat, location.lng]}>
        <Popup>You are here</Popup>
      </Marker>
    ) : null;
  }

  return (
    <PageComponent>
      <MapContainer
        center={[14.53106135, 121.02142205]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>

      <div>
        <h1>
          Latitude: {location.lat}, Longitude: {location.lng}
        </h1>
      </div>
    </PageComponent>
  );
}
