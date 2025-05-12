import React from 'react';
import { FaArrowLeft, FaMapMarkedAlt, FaHandsHelping, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/navbar/UserNavbar';
import Footer from '../components/layout/Footer';

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='w-full fixed top-0 left-0'>
        <UserNavbar></UserNavbar>
      </div>
      <div className="max-w-5xl mt-26 mx-auto px-4 pb-6 text-gray-800">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-violet-600 hover:text-violet-800  mb-16"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        <h1 className="text-4xl font-bold text-center text-violet-700 mb-10">
          About ResQMap
        </h1>

        <p className="text-lg text-center mb-12 text-gray-600">
          ResQMap is a real-time disaster reporting and response platform that connects citizens, volunteers, and authorities to act swiftly during emergencies.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <div className="text-violet-600 text-3xl mb-4">
              <FaMapMarkedAlt />
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Disaster Reporting</h3>
            <p className="text-gray-600">
              Users can report disasters with exact locations, severity levels, images, and videos — keeping everyone informed and alert.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <div className="text-violet-600 text-3xl mb-4">
              <FaHandsHelping />
            </div>
            <h3 className="text-xl font-semibold mb-2">Resource Requests</h3>
            <p className="text-gray-600">
              People in need can request food, water, shelter, and medical help. Volunteers and authorities get notified instantly.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <div className="text-violet-600 text-3xl mb-4">
              <FaBell />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Alerts</h3>
            <p className="text-gray-600">
              The system sends real-time alerts via SMS and email to users near affected areas to ensure safety and awareness.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center text-gray-600">
          <p>
            Whether you're a citizen reporting a disaster, a volunteer ready to help, or an authority managing a crisis — <strong>ResQMap</strong> empowers you to respond faster and smarter.
          </p>
          <p className="mt-4">
            Together, we can save lives. 🌍❤️
          </p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default About;
