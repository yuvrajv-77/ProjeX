
import { BorderBeam } from '@/components/magicui/border-beam';
import { useAuth } from '@/context/authContext'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Showcase = () => {
    const { user, loading, session } = useAuth();
    const navigate = useNavigate();
    const devImg =
    "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
    return (
        <main className="  mx-auto  bg-background">
            <div>
                {/* -----showcase cover----- */}
                <div className='h-70 relative '>
                    <img src="/car.jpg" className='h-full w-full object-cover ' alt="" />
                    <span className="absolute -bottom-3 left-1/2 transform  rounded-full">
                        <img
                            className="rounded-full size-30 object-cover"
                            src={devImg}
                            alt=""
                        />
                        
                    </span>
                </div>
                <div className='md:px-30 px-5 '>

                </div>
            </div>
        </main>
    )
}

export default Showcase