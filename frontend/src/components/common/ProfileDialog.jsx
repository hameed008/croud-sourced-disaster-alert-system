import React, { useState } from 'react';
import {
  FiUser, FiEdit, FiLogOut, FiX,
  FiCamera, FiMail, FiCalendar
} from 'react-icons/fi';

import { useAuth } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const ProfileDialog = ({ isOpen, onClose, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreView] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: 'images/user-profile.svg'
  });


  const { logout, updateUser } = useAuth()


  const joinDate = user?.createdAt
    ? new Date(user?.createdAt).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
      day: 'numeric'  // Optional: Add if you want "April 21, 2025"
    })
    : 'N/A';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    // console.log(e.target)
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file }); // Save file for backend upload

      const reader = new FileReader();
      reader.onload = (event) => {
        //   console.log(event)
        setPreView(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formDataToSend = new FormData()
  //     formDataToSend.append('name', formData.name);
  //     formDataToSend.append('email', formData.email)
  //     formDataToSend.append('avatar', formData.avatar);
  //     const response = await updateUser(user?._id, formDataToSend);
  //     console.log(response)
  //     if (response.status === 200) {
  //       setPreView(null)
  //       Swal.fire({
  //         toast: true,
  //         position: 'top-end',   // 👈 top-right
  //         icon: 'success',
  //         title: 'User Updated Successfully!',
  //         showConfirmButton: false,
  //         timer: 3000,           // 👈 auto close after 3 sec
  //         timerProgressBar: true
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       toast: true,
  //       position: 'top-end',
  //       icon: 'error',
  //       title: 'Failed to update user!',
  //       showConfirmButton: false,
  //       timer: 3000,
  //       timerProgressBar: true,
  //     });
  //   } finally {
  //     setIsEditing(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true)
    try {
      // Create FormData INSIDE submit handler
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);

      // Only append avatar if it's a File object (new upload)
      if (formData.avatar instanceof File) {
        formDataToSend.append('avatar', formData.avatar);
      }

      const response = await updateUser(user?._id, formDataToSend);

      if (response.status === 200) {

        //? here (user.avatar?.url) not working
        // setFormData(prev => ({
        //   ...prev,
        //   avatar: user.avatar?.url || prev.avatar
        // }));

        // Update ALL fields from response
        setFormData({
          name: response.data?.user?.name || formData.name,
          email: response.data?.user?.email || formData.email,
          avatar: response.data?.user?.avatar?.url || formData.avatar
        });

        // Update formData with new avatar URL from response
        // setFormData(prev => ({
        //   ...prev,
        //   avatar: response.data.user.avatar?.url || prev.avatar
        // }));

        setPreView(null); // Clear preview

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'User Updated Successfully!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed to update user!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setIsEditing(false);
      setIsSaving(false)
    }
  };

  // const handleDialogClick = (e) => {
  //   // Only close if clicking on specific elements
  //   if (e.target.classList.contains('close-trigger')) {
  //     onClose();
  //   }
  // };

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Overlay */}
      <div
        className={` overlay close-trigger fixed w-screen h-screen inset-0 bg-black bg-opacity-10 transition-opacity duration-300 ${isOpen ? 'opacity-70' : 'opacity-0'}`}
      // onClick={onClose}
      />


      {/* Dialog Container */}
      <div className={`absolute top-1 right-0 transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dialog Content */}
        <div className="mx-auto w-72 bg-gray-100 rounded-lg shadow-xl z-50 overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>

          {/* Profile Header */}
          <div className="flex flex-col items-center pt-6 pb-4 px-4 border-b border-violet-200">
            <div className="relative mb-3">
              <img
                src={preview || formData.avatar}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200"
              />
              {isEditing && (
                <>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm hover:bg-violet-50 cursor-pointer"
                  >
                    <FiCamera className="text-violet-600 text-sm" />
                  </label>
                </>
              )}
            </div>

            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="text-lg font-bold text-gray-800 bg-white px-2 py-1 mb-2 w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-violet-400"
              />
            ) : (
              <h2 className="text-lg font-bold text-gray-700">Hi, {formData.name || 'User'}!</h2>
            )}

            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="text-sm text-gray-600 bg-white px-2 py-1 w-full border border-violet-300 rounded-md p-2 focus:outline-none focus:ring-1  focus:ring-indigo-600 focus:border-violet-400"
              />
            ) : (
              <p className="text-sm text-gray-600">{formData.email || 'user@example.com'}</p>
            )}
          </div>

          {/* User Details */}
          <div className="p-4 space-y-3">
            <div className="flex items-center">
              <FiCalendar className="text-gray-500 mr-2 text-sm" />
              <div>
                <p className="text-xs text-gray-500">Member since</p>
                <p className="text-sm text-gray-800">{joinDate}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t  border-indigo-200 pt-2 pb-2 px-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-start space-x-2 py-2 px-4 text-sm text-white bg-violet-600 hover:bg-violet-700 rounded cursor-pointer mx-auto"
                >
                  {/* <span>Save Changes</span> */}
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Saving Details
                    </>
                  ) : (
                    <div className='flex gap-2 items-center'>
                      <FiEdit className="text-white" /> <span>Save Changes</span>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => {
                    setFormData({
                      name: user?.name || '',
                      email: user?.email || '',
                      avatar: user?.avatar.url || 'images/avatar2.png'
                    });
                    setIsEditing(false);
                  }}
                  className="w-full flex items-center justify-start space-x-2 py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 mt-2 cursor-pointer"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full flex items-center justify-start space-x-2 py-2 px-4 text-sm text-gray-700 hover:text-gray-600 hover:bg-violet-100 cursor-pointer"
                >
                  <FiEdit className="text-violet-600" />
                  <span>Update Profile</span>
                </button>
                <button
                  onClick={() => {
                    // Handle logout
                    logout()
                    Swal.fire({
                      toast: true,
                      position: 'top-end',   // 👈 top-right
                      icon: 'success',
                      title: 'Logged Out Successfully!',
                      showConfirmButton: false,
                      timer: 3000,           // 👈 auto close after 3 sec
                      timerProgressBar: true
                    });
                    onClose();
                  }}
                  className="w-full flex items-center justify-start space-x-2 py-2 px-4 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <FiLogOut className="text-red-600" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDialog;