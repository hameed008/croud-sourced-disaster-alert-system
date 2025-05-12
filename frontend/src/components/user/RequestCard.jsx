import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaHandsHelping } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

const url = import.meta.env.VITE_REACT_APP_API_URL
//const url = import.meta.env.VITE_REACT_APP_PRODUCTION_API_URL


const RequestCard = ({ request }) => {

  dayjs.extend(relativeTime);
  const isNew = dayjs().diff(dayjs(request.createdAt), 'minute') < 15;


  const checkoutHandler = async (amount) => {

    const { data: KeyData } = await axios.get(`${url}/payment/getKey`)
    const { key } = KeyData
    console.log(key)
    const { data: orderData } = await axios.post(`${url}/payment/payment-process`, { amount: 1000 })

    const { order } = orderData
    console.log(order)

    // Open Razorpay Checkout
    const options = {
      key: key, // Replace with your Razorpay key_id
      amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'ResQMap',
      description: 'Donation',
      order_id: order.id, // This is the order_id created in the backend
      callback_url: `${url}/payment/paymentVerification`, // Your success URL
      prefill: {
        name: 'Hameed Khan',
        email: 'khanhameed0044@gmail.com',
        contact: '9999999999'
      },
      theme: {
        color: '#F37254'
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();

  }


  return (
    <div className="p-4 bg-white border-l-4 border-green-500 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 space-y-4 relative">


      {isNew && (
        <span className="absolute top-2 right-2 bg-gradient-to-r from-lime-300 via-emerald-500 to-green-700 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce shadow-md">
          New
        </span>
      )}

      <div className="flex items-center justify-between mt-3 ">
        <h2 className="text-2xl font-bold text-green-700">{request.type}</h2>
        <span className="text-lg text-gray-600">{request.quantity} Units</span>
        <h3 className="text-lg text-gray-500">{request.address.city}</h3>
      </div>

      <p className="text-gray-700">{request.description}</p>


      <div className="flex items-center justify-between">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-semibold">
          Urgency: {request.urgency}
        </span>

        <span className={`px-3 py-1 rounded-md text-sm font-semibold 
          ${request.status === "Resolved"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"}`}>
          {request.status}
        </span>
      </div>

      <div className='flex justify-between '>
        <p className="text-sm text-gray-600">
          Requested By: <span className="font-medium text-black">{request.requestedBy?.name || "Unknown"}</span>
        </p>

        <p className="text-sm text-gray-500">
          Requested: <span className="font-medium">{dayjs(request.createdAt).fromNow()}</span>
        </p>
      </div>


      {/* <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-colors duration-200">
        <Link>Help</Link>
      </button> */}

      <button
        className=" flex max-w-min bg-green-500 hover:bg-green-600 text-white px-3 py-1.5  rounded-md transition-colors duration-200 items-center gap-2 text-sm"
        aria-label="Get help"
        onClick={() => checkoutHandler()}
      >
        <FaHandsHelping size={25} aria-hidden="true" />
        <span className='text-lg'>Help</span>
      </button>
    </div>
  );
};

export default RequestCard;


// import React from 'react';

// const RequestCard = ({ request }) => {
//   return (
//     <div className="p-6 bg-white border-l-4 border-green-500 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 space-y-4">

//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-green-700">{request.type}</h2>
//         <span className="text-lg text-gray-600">{request.quantity} Units</span>
//       </div>

//       <p className="text-gray-700">{request.description}</p>

//       <p className="text-sm text-gray-600">
//         Status: <span className="font-semibold text-black">{request.status}</span>
//       </p>

//       <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium">
//         Accept Request
//       </button>
//     </div>
//   );
// };

// export default RequestCard;

////////////////////////////////////////////

// import React from 'react'

// const RequestCard = ({ request }) => {
//   // console.log(request)
//   return (
//     <div className="p-6 bg-green-100 flex flex-col gap-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ">
//       <div className='flex items-center gap-2  '>
//         <h2 className='text-3xl font-bold'>{request.type} - </h2>
//         <span className='text-2xl text-gray-500'>{request.quantity} Units</span>
//       </div>

//       <p className="text-sm text-gray-600">{request.description}</p>
//       <p className="text-sm text-gray-500">
//         Status: <span className="font-medium">{request.status}</span>
//       </p>

//       <div><button className='bg-green-400 py-1 px-3 rounded-sm tracking-wide cursor-pointer'>Accept</button></div>
//     </div>
//   )
// }

// export default RequestCard
