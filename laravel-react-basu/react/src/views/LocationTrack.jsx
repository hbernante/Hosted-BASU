import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import { updateLocation, getLocation } from "../axios"; // Import the updateLocation and getLocation functions

function LocationMarker({ position, setPosition }) {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom(), { duration: 3 });
      updateLocation(e.latlng.lat, e.latlng.lng);
    },
  });

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom(), { duration: 3 });
    }
  }, [map, position]);

  return position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
}

const LocationTrack = () => {
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {},
        () => {
          setShowLocationPrompt(true);
        }
      );
    }
  }, []);

  const handleEnableLocationServices = () => {
    setShowLocationPrompt(false);
    navigator.geolocation.getCurrentPosition(
      (position) => {},
      () => {
        alert("Please enable location services in your browser settings.");
      }
    );
  };

  const handleResetLocation = () => {
    setCurrentLocation(null);
    updateLocation(null, null);
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const location = await getLocation();
        if (location) {
          setCurrentLocation({
            lat: location.latitude,
            lng: location.longitude,
          });
        }
      } catch (error) {
        console.error("Failed to get user location:", error);
      }
    };

    fetchUserLocation();
  }, []);

  return (
    <PageComponent backdropColor="#f0f4f8">
      <div className="flex flex-col items-center">
        Shuttle Geolocation Display
        <h1 className="text-3xl font-semibold mb-4">
          "shuttleVehicle" on "currentRoute"
        </h1>
        {/* Description */}
        <div className="w-full lg:w-3/4 h-96 mb-8 border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <MapContainer
            center={{ lat: 14.5311, lng: -0.09 }}
            zoom={20}
            scrollWheelZoom={false}
            className="h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker
              position={currentLocation}
              setPosition={setCurrentLocation}
            />
          </MapContainer>
        </div>
        {/* Location Services Prompt */}
        {showLocationPrompt && (
          <div className="bg-white border border-gray-300 rounded-lg p-4 mb-8 max-w-lg w-full text-center shadow-md">
            <p className="text-red-600">
              Please enable location services to use this feature.
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={handleEnableLocationServices}
            >
              Enable Location Services
            </button>
          </div>
        )}
        {/* Reset Location Button */}
        {currentLocation && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-lg">
            <div className="text-center">
              <TButton onClick={handleResetLocation} color="red">
                Reset Location
              </TButton>
            </div>
            <div className="text-center">
              <TButton onClick={handleResetLocation} color="yellow">
                PUSH TO NOTIFY SHUTTLE
              </TButton>
            </div>
            <div className="text-center">
              <TButton onClick={handleResetLocation} color="green">
                Reset Location
              </TButton>
            </div>
          </div>
        )}
        {/* Paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mt-10">
          <div className="border border-blue-900 p-4 rounded-md">
            <p className="text-gray-800 font-mono">Description Here</p>
          </div>
          <div className="border border-blue-900 p-4 rounded-md">
            <p className="text-gray-800 font-mono">Another Description</p>
          </div>
        </div>
      </div>
    </PageComponent>
  );
};

export default LocationTrack;
