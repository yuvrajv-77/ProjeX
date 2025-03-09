import React from 'react'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Brand from './Brand'
import { useAuth } from '@/context/authContext'
import { logout } from '@/services/authService'


const Navbar = () => {
    const navigate = useNavigate();
    const { user, loading, session } = useAuth();

    return (
        <>
            <header className='w-full bg-background px-8 md:px-30'>
                <nav className='flex items-center justify-between  py-6 '>

                    {/* ----- Hamburger Menu for mobile screen ------ */}
                    <Sheet >
                        <SheetTrigger className='md:hidden'>
                            <button className='flex flex-col justify-between items-start gap-3 md:hidden' >
                                <span className={`bg-foreground h-[2.6px] w-7 rounded-2xl `}></span>
                                <span className={`bg-foreground h-[2.5px] w-4 rounded-2xl `}></span>
                            </button>
                        </SheetTrigger>
                        <SheetContent side='left' className='md:hidden'>
                            {/* ---mobile menu---- */}
                            <ul className='flex items-center flex-col my-auto gap-15'>
                                <Link to={'/homepage'}>
                                    <li>
                                        <h1 className='text-2xl font-light projex flex items-center'>Proje<span className='font-extrabold text-3xl '>X</span></h1>
                                    </li>
                                </Link>
                                <Link to={'/homepage'}>
                                    <li className='font-medium text-xl hover:cursor-pointer hover:underline'>Home</li>
                                </Link>
                                <Link to={'/homepage'}>
                                    <li className='font-medium text-xl hover:cursor-pointer hover:underline'>Project</li>
                                </Link>
                                <Link to={'/homepage'}>
                                    <li className='font-medium text-xl hover:cursor-pointer hover:underline'>Showcase</li>
                                </Link>
                                <Link to={'/homepage'}>
                                    <li className='font-medium text-xl hover:cursor-pointer hover:underline'>About</li>
                                </Link>
                                <Link to={'/homepage'}>
                                    <li>
                                        <Button size={'lg'}>Login</Button>
                                    </li>
                                </Link>
                            </ul>
                        </SheetContent>
                    </Sheet>

                    <Brand />
                    {/* ----- Desktop Menu ------  */}

                    <ul className='hidden md:flex items-center gap-15 font-'>
                        <Link to={'/homepage'}>
                            <li className='text-lg hover:cursor-pointer hover:underline'>Home</li>
                        </Link>
                        <Link to={'/homepage'}>
                            <li className=' text-lg hover:cursor-pointer hover:underline'>Project</li>
                        </Link>
                        <Link to={'/showcase'}>
                            <li className=' text-lg hover:cursor-pointer hover:underline'>Showcase</li>
                        </Link>
                        <Link to={'/homepage'}>
                            <li className=' text-lg hover:cursor-pointer hover:underline'>About</li>
                        </Link>
                    </ul>

                    <div className='flex items-center justify-end gap-5'>
                        {
                            !loading && !user && <Button onClick={() => navigate('/getstarted')}>Sign Up</Button>
                        }

                        {
                            user &&
                            <DropdownMenu>
                                <DropdownMenuTrigger className='flex items-center gap-2'>
                                    <Avatar className='w-12 h-12'>
                                        <AvatarImage className='' src={user?.user_metadata?.avatar_url} />
                                    </Avatar>
                                    <p className='hidden sm:block'>{user?.user_metadata?.name}</p>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel className='font-bold'>{user?.user_metadata?.name}</DropdownMenuLabel>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        }

                    </div>


                </nav>
            </header>



        </>
    )
}

export default Navbar