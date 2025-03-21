import { ModeToggle } from '@/components/mode-toggle'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/context/authContext'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

const RootLayout = () => {
  const { user, loading, session } = useAuth();
  console.log('Auth State:', { user, loading, session });

  return (
    <div className=''>
      <Navbar />
      <Outlet />
      {/* <div className="fixed bottom-10 right-10 ">
        <ModeToggle />
      </div> */}
     

    </div>
  )
}

export default RootLayout