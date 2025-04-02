import React from 'react'
import { Button } from './ui/button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
import { Input } from './ui/input'
import { Search, Vault } from 'lucide-react'
import { ModeToggle } from './mode-toggle'


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, loading, session } = useAuth();

    // Hide navbar on showcase route
    // if (location.pathname === '/showcase') {
    //     return null;
    // }

    return (
        <>
            <header className=' border-b w-full bg-transparent backdrop-blur-3xl px-5 md:px-20'>
                <nav className='flex items-center justify-between  py-3 '>

                    <div className='flex items-center gap-3'>

                        {/* ----- Hamburger Menu for mobile screen ------ */}
                        <Sheet >
                            <SheetTrigger className="flex flex-col justify-between items-start gap-3 md:hidden">
                                {/* <button className='flex flex-col justify-between items-start gap-3 md:hidden' > */}
                                    <span className={`bg-foreground h-[2.6px] w-7 rounded-2xl `}></span>
                                    <span className={`bg-foreground h-[2.5px] w-4 rounded-2xl `}></span>
                                {/* </button> */}
                            </SheetTrigger>

                            <SheetContent side='left' className='md:hidden'>
                                {/* ---mobile menu---- */}
                                <ul className='flex items-center flex-col my-auto gap-15'>
                                    <Link to={'/homepage'}>
                                        <li>
                                            <Brand />
                                        </li>
                                    </Link>
                                    <Link to={'/'}>
                                        <li className='font-medium text-xl hover:cursor-pointer hover:underline'>Explore</li>
                                    </Link>
                                    <Link to={'/project'}>
                                        <li className='font-medium text-xl hover:cursor-pointer hover:underline'>Collections</li>
                                    </Link>
                                    <Link to={'/profile'}>
                                        <li className='font-medium text-xl hover:cursor-pointer hover:underline'>Profile</li>
                                    </Link>
                                    <Link to={'/project'}>
                                        <li className='font-medium text-xl hover:cursor-pointer hover:underline'>Project</li>
                                    </Link>
                                    {!user && <Link to={'/getstarted'}>
                                        <li>
                                            <Button size={'lg'}>Login</Button>
                                        </li>
                                    </Link>}
                                </ul>
                            </SheetContent>
                        </Sheet>
                        <Brand className='' />
                    </div>
                    {/* ----- Desktop Menu ------  */}

                    <ul className='hidden md:flex items-center gap-10 font-'>
                        <Link to={'/'}>
                            <li className='text- hover:cursor-pointer hover:underline'>Explore</li>
                        </Link>
                        <Link to={'/project'}>
                            <li className=' text- hover:cursor-pointer hover:underline'>Collections</li>
                        </Link>
                        <Link to={'/profile'}>
                            <li className=' text- hover:cursor-pointer hover:underline'>Profile</li>
                        </Link>
                        <Link to={'/project'}>
                            <li className=' text- hover:cursor-pointer hover:underline'>Project</li>
                        </Link>
                        <Link to={'/team'}>
                            <li className=' text- hover:cursor-pointer hover:underline'>Team</li>
                        </Link>
                    </ul>
                      {/* <div className='relative hidden lg:flex-auto md:block mx-4 max-w-96'>
                          <Search className='absolute left-3 top-1/2 -translate-y-1/2 z-10' strokeWidth={1} color='gray' />
                          <Input 
                              className='w-full border-none bg-accent pl-10 transition-all duration-300 focus:max-w-none' 
                              placeholder='Search By Inspiration' 
                          />
                      </div> */}
                    <div className='flex items-center justify-end gap-4'>
                        <ModeToggle />
                        {
                            !loading && !user && <Button size={'lg'} variant={'link'} onClick={() => navigate('/getstarted')}>Login</Button>
                        }
                        {
                            !loading && !user && <Button size={'lg'} onClick={() => navigate('/getstarted')}>Sign Up</Button>
                        }
                        {
                            user &&
                            <DropdownMenu>
                                <DropdownMenuTrigger className='flex items-center gap-2'>
                                    <Avatar className='w-9 h-9'>
                                        <AvatarImage className='' src={user?.user_metadata?.avatar_url || 'https://github.com/shadcn.png'} />
                                    </Avatar>
                                    {/* <p className='hidden sm:block'>{user?.user_metadata?.name}</p> */}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel className='font-bold'>{user?.user_metadata?.name}</DropdownMenuLabel>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        }
                        <Button variant={'outline'} size={'lg'} onClick={() => navigate('/add-new-project')} className='hidden md:block outline-2'>Showcase Project</Button>
                    </div>
                </nav>
            </header>

        </>
    )
}

export default Navbar