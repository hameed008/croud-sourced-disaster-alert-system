import React, { useState, useEffect } from 'react';
import { Map, NavigationControl, Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RiMapPin2Fill } from "react-icons/ri";
//import { useLayout } from '../../contexts/LayoutContext';
import { useReports } from '../../contexts/ReportContext';
const MapboxMap = () => {

  let [updatedReports, setUpdatedReports] = useState([]);
  const { reports } = useReports();

  useEffect(() => {
    setUpdatedReports(reports);
  }, [reports]);


  const [viewState, setViewState] = useState({
    latitude: 20.5937,    // ✅ Correct lat for India
    longitude: 78.9629,   // ✅ Correct lng for India
    zoom: 4,
  });

  const getIconForType = (type) => {
    switch (type) {
      case "Fire":
        return "images/fire-icon.png";
      case "Wildfire":
        return "images/wildfire-icon.png";
      case "Flood":
        return "images/flood-icon.png";
      case "Drought":
        return "images/drought-icon.png";
      case "Landslide":
        return "images/landslide-icon.png";
      case "Tornado":
        return "images/tornado-icon.png";
      case "Tsunami":
        return "images/tsunami-icon.png";
      case "Earthquake":
        return "images/earthquake-icon.png";
      case "Hurricane":
        return "images/hurricane-icon.png";
      default:
        return "images/location-icon.png"; // fallback
    }
  };


  return (
    <div className="lg:w-[100%] mx-2">
      <Map
        //  ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: '100%', height: 700 }}
        mapStyle="mapbox://styles/hameed003/cm9il9s0z003i01sb0stmcvsf"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        scrollZoom={false} // 👈 disables scroll zoom on map
      >
        <NavigationControl position="top-right" />

        {/* {disasterLocations.map(loc => (
          <Marker key={loc.id} latitude={loc.lat} longitude={loc.lng} anchor="bottom">
            <RiMapPin2Fill size={36} color="red" />
          </Marker>
        ))} */}

        {updatedReports && updatedReports.map((report) => (
          <Marker
            key={report._id}
            latitude={report.location.coordinates[1]}
            longitude={report.location.coordinates[0]}
            anchor="bottom"
          >
            <img
              src={getIconForType(report.disasterType)}
              alt={report.disasterType}
              title={report.disasterType}
              width={20}
              height={20}
            />
          </Marker>


        ))}

      </Map>
    </div>
  );
};

export default MapboxMap;
