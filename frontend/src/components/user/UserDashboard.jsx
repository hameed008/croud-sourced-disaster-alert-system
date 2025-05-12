import React from 'react'
//import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import IncidentsContainer from './IncidentsContainer'
import ResourceRequestsContainer from './ResourceRequestsContainer';
import MapView from './MapView'
import MapboxMap from './MapboxMap';
import LiveUpdates from './LiveUpdates';
//import useSocket from '../utils/socket';
import WelcomeMesseage from './WelcomeMesseage';


const UserDashboard = () => {
  const { user } = useAuth();
  return (
    <>
      <WelcomeMesseage />
      <LiveUpdates></LiveUpdates>
      <MapboxMap />
      {/* <MapView /> */}
      <IncidentsContainer />
      <ResourceRequestsContainer />

    </>
  )

}

export default UserDashboard
