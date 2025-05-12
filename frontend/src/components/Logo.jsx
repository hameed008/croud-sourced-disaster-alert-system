import React from 'react'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center cursor-pointer" onClick={() => navigate('/user')}>
      <img src={logo} alt="Logo" className="w-16 md:w-18 mb-2" />
    </div>
  )
}

export default Logo
