import React from 'react'
import colors from '../colors'
import { Navbar, Sidebar } from '../components'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className="h-full w-full" style={{ backgroundColor: colors.primary }}>
      <Navbar />
      <div className="flex gap-3">
        <Sidebar />
        <Outlet/>
      </div>
    </div>
  )
}

