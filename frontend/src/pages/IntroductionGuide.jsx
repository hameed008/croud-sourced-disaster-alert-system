import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMap, FaHandHoldingHeart, FaBell, FaRocket } from 'react-icons/fa';
import UserNavbar from '../components/navbar/UserNavbar';
import appName from "../assets/app-name.svg";

const IntroductionGuide = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <div className='w-full fixed top-0 left-0'>
        <UserNavbar></UserNavbar>
      </div> */}
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-blue-100 py-12 px-6">
        {/* Header */}
        <div className="max-w-6xl mx-auto text-center mb-12 ">
          <div className='mx-auto flex items-center justify-center gap-2'>
            <h1 className="text-4xl font-extrabold text-violet-700 mb-2 ">Welcome to</h1>
            <img src={appName} alt="App Name" className='w-40 p-0' />
          </div>
          <p className="text-lg text-gray-600">
            Your all-in-one disaster response platform for reporting, requesting help, and staying informed.
          </p>
        </div>

        {/* Guide Sections */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16">

          {/* Report a Disaster */}
          <div className="group bg-white p-6 rounded-lg shadow-md hover:bg-violet-700 hover:text-white hover:shadow-xl transition-all">
            <div className="text-violet-600 text-3xl mb-4">
              <FaMap className='animate-bounce group-hover:text-white' />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-white">
              📍 Report a Disaster
            </h3>
            <p className="text-gray-600 group-hover:text-white">
              Easily report incidents like floods, earthquakes, or fires. Just click the location on the map, add a description, severity, and optionally upload images or videos.
            </p>
          </div>


          {/* Request Resources */}
          <div className="group bg-white p-6 rounded-lg shadow-md hover:bg-violet-700 hover:text-white hover:shadow-xl transition-all">
            <div className="text-violet-600 text-3xl mb-4">
              <FaHandHoldingHeart className='animate-bounce group-hover:text-white' />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-white">🛠️ Request Resources</h3>
            <p className="text-gray-600 group-hover:text-white">
              Need food, shelter, or medical help? Submit a request with your location and urgency. Volunteers and responders will be alerted.
            </p>
          </div>

          {/* Get Real-time Alerts */}
          <div className="group bg-white p-6 rounded-lg shadow-md hover:bg-violet-700 hover:text-white hover:shadow-xl transition-all">
            <div className="text-violet-600 text-3xl mb-4">
              <FaBell className='animate-bounce group-hover:text-white' />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-white">📢 Get Notified</h3>
            <p className="text-gray-600 group-hover:text-white">
              Stay safe with real-time alerts via SMS and email based on your location and disaster severity.
            </p>
          </div>

          {/* View Reports & Requests */}
          <div className="group bg-white p-6 rounded-lg shadow-md hover:bg-violet-700 hover:text-white hover:shadow-xl transition-all">
            <div className="text-violet-600 text-3xl mb-4">
              <FaRocket className='animate-bounce group-hover:text-white' />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-white">📊 View & Track</h3>
            <p className="text-gray-600 group-hover:text-white">
              Access your submitted reports and requests. Monitor their verification status and responses in real-time.
            </p>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/user')}
            className="bg-violet-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-violet-700 transition"
          >
            🚀 Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default IntroductionGuide;
