import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon to fix missing icon issue
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationMarker = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocation({ lat, lng });
    },
  });
  return null;
};

const MapView = ({ location = {}, setLocation }) => {
  const center = [location.lat || 37.7749, location.lng || -122.4194];

  return (
    <div style={{ height: "400px", width: "100%" }} className="z-0">
      <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location.lat && location.lng && (
          <Marker position={[location.lat, location.lng]} icon={markerIcon} />
        )}
        <LocationMarker setLocation={setLocation} />
      </MapContainer>
    </div>
  );
};

export default MapView;
