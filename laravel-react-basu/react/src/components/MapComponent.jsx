import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Pusher from 'pusher-js'; // Import Pusher

const MapComponent = () => {
    const [markers, setMarkers] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        const pusher = new Pusher('e7f113f5d487dc5f8a50', {
            cluster: 'ap1',
        });

        const channel = pusher.subscribe('location-channel');
        channel.bind('location.updated', function(data) {
            // Update markers with the received location data
            setMarkers(prevMarkers => {
                // Update marker corresponding to the user whose location was updated
                const updatedMarkers = prevMarkers.map(marker => {
                    if (marker.userId === data.user_id) {
                        return { ...marker, lat: data.latitude, lng: data.longitude };
                    }
                    return marker;
                });
                return updatedMarkers;
            });
        });

        return () => {
            // Unsubscribe from Pusher channel when component unmounts
            pusher.unsubscribe('location-channel');
        };
    }, []);

    // Function to handle fetching current location
    const handleGetCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
        }, error => {
            console.error('Error fetching current location:', error);
        });
    };

    return (
        <div>
            <button onClick={handleGetCurrentLocation}>Show Current Location</button>
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {currentLocation && (
                    <Marker position={[currentLocation.lat, currentLocation.lng]}>
                        {/* Additional marker content */}
                    </Marker>
                )}
                {markers.map(marker => (
                    <Marker key={marker.userId} position={[marker.lat, marker.lng]}>
                        {/* Additional marker content */}
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
