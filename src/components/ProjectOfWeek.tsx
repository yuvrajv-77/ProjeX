import React from 'react'
import { MagicCard } from '@/components/magicui/magic-card'
import { ShineBorder } from '@/components/magicui/shine-border'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { Heart } from 'lucide-react'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { HoverBorderGradient } from './ui/hover-border-gradient'



const ProjectOfWeek = () => {
    return (
        <div className=' md:w-[80%] w-full mx-auto my-10  relative'>
            <HoverBorderGradient as={'div'} className='p-9 rounded-2xl bg-background text-foreground'>
            
            <div className='space-y-3'>
                <h2 className='text-3xl font-semibold'>Project of the Week</h2>
                <p className='text-gray-500 dark:text-gray-300'>Check out the project of the day by Someone</p>
            </div>

            <div className='flex flex-col md:flex-row justify-between gap-10  mt-6 '>
                <section className=' '>
                    <CardContainer className='md:w-[26rem] md:h-[20rem] p-0'>
                        <img className='rounded-3xl w-full h-full object-cover'
                            src="https://cdn.dribbble.com/userupload/39530871/file/original-d47808d69f54d5a748176481a14a89a1.jpg?resize=1024x768&vertical=center" alt="" />
                    </CardContainer>
                </section>
                <section className=' flex flex-col justify-between gap-3 '>
                    <div className='space-y-3'>
                        <h2 className='text-2xl font-semibold'>AI-Powered Code Assistant</h2>
                        <p className='text-gray-500 dark:text-gray-300 text-lg'>A revolutionary tool that helps developers write better code faster using advanced AI models and machine learning techniques.</p>
                        <ul className='flex flex-wrap gap-2'>
                            <li>React</li>
                            <li>AWS</li>
                            <li>Java</li>
                        </ul>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='flex items-center gap-2'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                            </Avatar>
                            <p>Arjun Kanungo</p>
                        </span>
                        <div className='flex gap-2 items-center'>
                            <Button variant={'ghost'}><Heart /></Button>
                            <Button>View Project</Button>
                        </div>
                    </div>
                </section>
            </div>
        </HoverBorderGradient>
        </div>
    )
}

export default ProjectOfWeek