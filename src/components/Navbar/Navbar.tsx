import React from 'react'
import { useSelector } from 'react-redux'

export const Navbar = () => {
  const userData = useSelector((state)=>state.userData.data)
  console.log('userData: ', userData)
  return (
    <div className='text-center bg-red-500'>
        Navbar
    </div>
  )
}

