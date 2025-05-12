import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
const WelcomeMesseage = () => {
  const { isLoggedIn, user } = useAuth();
  return (
    <div className='mt-5'>
      {isLoggedIn && (
        <h1 >Welcome, {user?.name}</h1>
      )}
    </div>
  )
}

export default WelcomeMesseage
