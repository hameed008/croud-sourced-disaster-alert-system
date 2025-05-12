import React from 'react'

const NotFoundPage = () => {
  return (
    <div className=' w-full h-screen flex flex-col gap-3 justify-center items-center px-6'>
      <h2 className='text-gray-700 text-5xl font-bold mb-6 '>404</h2>
      <h2 className=' text-gray-700 text-2xl font-bold'> Oops... Page not found</h2>
      <p className='text-gray-700 text-md ld:text-lg font-bold'>We don't know how you ended up here, but you should go away now.</p>
    </div>
  )
}

export default NotFoundPage
