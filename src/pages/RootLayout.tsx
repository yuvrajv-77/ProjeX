import { ModeToggle } from '@/components/mode-toggle'
import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className=''>
      <Navbar />
      <Outlet />
      <div className="fixed bottom-10 right-10 ">
        <ModeToggle />
      </div>

    </div>
  )
}

export default RootLayout