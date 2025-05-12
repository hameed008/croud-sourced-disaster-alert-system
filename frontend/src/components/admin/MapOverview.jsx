import React, { useState, useCallback } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl, Source, Layer } from 'react-map-gl';
import {
  Typography,
  Paper,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton
} from '@mui/material';
import {
  Warning as IncidentIcon,
  LocalHospital as HospitalIcon,
  People as ShelterIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

const MapOverview = ({ className }) => {
  const [viewport, setViewport] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 5
  });

  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filter, setFilter] = useState('All');

  // Sample incident data
  const incidents = [
    {
      id: 1,
      type: 'Earthquake',
      severity: 'High',
      location: { lat: 28.6139, lng: 77.2090 },
      status: 'Active',
      description: 'Major earthquake in New Delhi',
      date: '2023-06-15'
    },
    {
      id: 2,
      type: 'Flood',
      severity: 'Medium',
      location: { lat: 19.0760, lng: 72.8777 },
      status: 'Verified',
      description: 'Flooding in Mumbai suburbs',
      date: '2023-06-14'
    },
    {
      id: 3,
      type: 'Fire',
      severity: 'Critical',
      location: { lat: 12.9716, lng: 77.5946 },
      status: 'Active',
      description: 'Forest fire in Bangalore outskirts',
      date: '2023-06-14'
    }
  ];

  const resources = [
    {
      id: 101,
      type: 'Hospital',
      location: { lat: 28.6239, lng: 77.2190 },
      name: 'Delhi General Hospital'
    },
    {
      id: 102,
      type: 'Shelter',
      location: { lat: 19.0860, lng: 72.8877 },
      name: 'Mumbai Relief Shelter'
    }
  ];

  const filteredIncidents = filter === 'All'
    ? incidents
    : incidents.filter(incident => incident.type === filter);

  const getIconColor = (severity) => {
    switch (severity) {
      case 'Critical': return '#ff0000';
      case 'High': return '#ff6600';
      case 'Medium': return '#ffcc00';
      default: return '#cccccc';
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'Hospital': return <HospitalIcon fontSize="small" />;
      case 'Shelter': return <ShelterIcon fontSize="small" />;
      default: return null;
    }
  };

  return (
    <Paper className={`${className} p-4`}>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="font-bold">
          Incident Map Overview
        </Typography>
        <div className="flex items-center space-x-2">
          <FormControl size="small" className="min-w-[120px]">
            <InputLabel>Filter</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Filter"
              startAdornment={<FilterIcon />}
            >
              <MenuItem value="All">All Incidents</MenuItem>
              <MenuItem value="Earthquake">Earthquakes</MenuItem>
              <MenuItem value="Flood">Floods</MenuItem>
              <MenuItem value="Fire">Fires</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="relative h-[500px] rounded-lg overflow-hidden">
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={setViewport}
        >
          <NavigationControl position="top-right" />

          {/* Incident Markers */}
          {filteredIncidents.map(incident => (
            <Marker
              key={`incident-${incident.id}`}
              latitude={incident.location.lat}
              longitude={incident.location.lng}
            >
              <IconButton
                onClick={() => setSelectedIncident(incident)}
                style={{ color: getIconColor(incident.severity) }}
              >
                <IncidentIcon fontSize="large" />
              </IconButton>
            </Marker>
          ))}

          {/* Resource Markers */}
          {resources.map(resource => (
            <Marker
              key={`resource-${resource.id}`}
              latitude={resource.location.lat}
              longitude={resource.location.lng}
            >
              <div className="bg-blue-500 text-white p-1 rounded-full">
                {getResourceIcon(resource.type)}
              </div>
            </Marker>
          ))}

          {/* Selected Incident Popup */}
          {selectedIncident && (
            <Popup
              latitude={selectedIncident.location.lat}
              longitude={selectedIncident.location.lng}
              onClose={() => setSelectedIncident(null)}
              closeButton={false}
            >
              <div className="space-y-2">
                <Typography variant="subtitle1" className="font-bold">
                  {selectedIncident.type}
                </Typography>
                <Chip
                  label={selectedIncident.severity}
                  color={
                    selectedIncident.severity === 'Critical' ? 'error' :
                      selectedIncident.severity === 'High' ? 'warning' : 'info'
                  }
                  size="small"
                />
                <Typography variant="body2">
                  {selectedIncident.description}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  Reported: {selectedIncident.date}
                </Typography>
                <div className="mt-2">
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Popup>
          )}
        </ReactMapGL>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className="flex items-center">
          <IncidentIcon style={{ color: '#ff0000' }} />
          <Typography variant="caption" className="ml-1">
            Critical
          </Typography>
        </div>
        <div className="flex items-center">
          <IncidentIcon style={{ color: '#ff6600' }} />
          <Typography variant="caption" className="ml-1">
            High
          </Typography>
        </div>
        <div className="flex items-center">
          <IncidentIcon style={{ color: '#ffcc00' }} />
          <Typography variant="caption" className="ml-1">
            Medium
          </Typography>
        </div>
        <div className="flex items-center">
          <HospitalIcon style={{ color: '#3f51b5' }} />
          <Typography variant="caption" className="ml-1">
            Hospital
          </Typography>
        </div>
        <div className="flex items-center">
          <ShelterIcon style={{ color: '#4caf50' }} />
          <Typography variant="caption" className="ml-1">
            Shelter
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default MapOverview;