import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"


const Navbar = () => {


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

                            <ul className='flex items-center flex-col my-auto gap-15'>
                                <Link to={'/homepage'}>
                                    <li>
                                        <h1 className='text-3xl text-center font-light'>Proje<span className='font-extrabold '>X</span></h1>
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

                    <h1 className='text-3xl font-light'>Proje<span className='font-extrabold '>X</span></h1>
                    {/* ----- Desktop Menu ------  */}

                    <ul className='hidden md:flex items-center gap-15'>
                        <Link to={'/homepage'}>
                            <li className='font-semibold text-lg hover:cursor-pointer hover:underline'>Home</li>
                        </Link>
                        <Link to={'/homepage'}>
                            <li className='font-semibold text-lg hover:cursor-pointer hover:underline'>Project</li>
                        </Link>
                        <Link to={'/showcase'}>
                            <li className='font-semibold text-lg hover:cursor-pointer hover:underline'>Showcase</li>
                        </Link>
                        <Link to={'/homepage'}>
                            <li className='font-semibold text-lg hover:cursor-pointer hover:underline'>About</li>
                        </Link>
                    </ul>

                    <div className='flex items-center justify-end gap-5'>
                        <Button>Login</Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar className='w-12 h-12'>
                                    <AvatarImage className='' src="https://github.com/shadcn.png" />
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className='font-bold'>Yuvraj Verma</DropdownMenuLabel>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>


                </nav>
            </header>



        </>
    )
}

export default Navbar