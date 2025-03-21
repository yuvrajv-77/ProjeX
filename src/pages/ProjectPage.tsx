
import { BoxReveal } from '@/components/magicui/box-reveal';
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Atom, Boxes, Cloud, Code2, Database, ExternalLink, FileCode2, Globe, Layers, LayoutGrid, Package, Palette, PencilRuler, Pickaxe, Server, Terminal, Trophy, Vault } from 'lucide-react';
import React, { useState } from 'react'

import { ScrollProgress } from '@/components/magicui/scroll-progress';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import FloatingNavbar from '@/components/FloatingNavbar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TechIcon } from '@/assets/TechIcons';

const technologies = ['React', "Tailwind CSS", "TypeScript", "Javascript", 'PHP', "Angular", 'Vite', 'Next JS', 'Figma']


const ProjectPage = () => {


    const navItems = [
        { id: 'creator', label: 'Creator', icon: LayoutGrid },
        { id: 'fontcolor', label: 'Font', icon: Palette },
        { id: 'details', label: 'Details', icon: Layers },
        { id: 'elements', label: 'Elements', icon: Layers },
        { id: 'score', label: 'Score', icon: Trophy },
    ];

    return (
        <main className="  mx-auto md:px-30 px-3 bg-background relative">
            <ScrollProgress className="top-[0px] " />
            <div className='my-15 md:my-30 '>

                <div className='mb-20 flex items-center  gap-2 flex-col'>

                    <TextGenerateEffect className='text-4xl tracking-tight md:text-6xl text-center text-accent-foreground font-semibold' words='Projex - A Projects Showcasing Platform' />
                    <div className='flex items-center gap-2 mt-3 cursor-pointer'>
                        <Avatar className='size-9'>
                            <AvatarImage src='https://github.com/shadcn.png' />
                        </Avatar>
                        <p className='text-xl md:text-3xl  underline hover:text-foreground text-accent-foreground font-semibold'>Vladimir</p>
                    </div>
                </div>

                <div className='mb-30'>
                    <img className=' w-full h-full object-cover'
                        src="https://assets.awwwards.com/awards/submissions/2025/02/67b3982a0e2cd790464326.png" alt="" />
                </div>

                <h1 className='text-2xl md:text-4xl text-center tracking-wide leading-tight font-light mb-30 md:mb-60'>
                    Where personality meets expertise: showcasing a brand strategist's unique approach and 20 years of experience through authentic storytelling, strategic thinking, and transformative work
                </h1>


                <div className='flex items-center gap-3 justify-between'>
                    <div className='border-b w-full '></div>
                    <h3 className='text-xl text-center font-light'>Elements</h3>
                    <div className='border-b w-full '></div>
                </div>

                <div className='mt-20'>
                    <h1 className='text-3xl text-start font-semibold'>
                        See the highlights<br />
                        of this website<span className='text-[#7c3df1]'>.</span>
                    </h1>

                    <div className='grid  grid-cols-1 md:grid-cols-2 gap-24 md:gap-10 items-center mt-14 md:mt-20'>
                        <div className='flex flex-col gap-10'>
                            <div className='w-full h-[20rem] md:h-[27rem]'>
                                <img src="https://assets.awwwards.com/awards/element/2025/03/67c5959098247918112280.jpg" className='rounded-xl w-full h-full object-cover' alt="" />
                            </div>
                            <div className='space-y-4 md:space-y-10'>
                                <BoxReveal boxColor={"#7c3df1"} duration={1}>
                                    <p className="text-4xl md:text-5xl text-start text-accent-foreground font-semibold">
                                        Organize and Manage the better Way<span className="text-[#7c3df1]">.</span>
                                    </p>
                                </BoxReveal>
                                {/* <BoxReveal boxColor={"#7c3df1"} duration={1}>
                                    <p className='text-2xl font-light'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                    </p>
                                </BoxReveal> */}
                            </div>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <div className='w-full h-[20rem] md:h-[27rem]'>
                                <img src="https://assets.awwwards.com/awards/element/2025/03/67c5959098247918112280.jpg" className='rounded-xl w-full h-full object-cover' alt="" />
                            </div>
                            <div className='space-y-4 md:space-y-10'>
                                <BoxReveal boxColor={"#7c3df1"} duration={1}>
                                    <p className="text-4xl md:text-5xl text-start text-accent-foreground font-semibold">
                                        Organize and Manage the better Way<span className="text-[#7c3df1]">.</span>
                                    </p>
                                </BoxReveal>
                                {/* <BoxReveal boxColor={"#7c3df1"} duration={1}>
                                    <p className='text-2xl font-light'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                    </p>
                                </BoxReveal> */}
                            </div>
                        </div>
                    </div>

                </div>

                <div className='mt-40 md:mt-80 flex md:flex-row flex-col justify-center gap-11 md:gap-0 md:justify-between items-center'>
                    <h1 className='text-3xl  self-start text-start font-semibold'>This website has<br />been created using...</h1>
                    <div className='flex flex-wrap gap-10  items-center  justify-center'>
                        {technologies.map((tech) => (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <TechIcon name={tech} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{tech}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                </div>


                <div className='mt-60'>

                </div>

            </div>
            <FloatingNavbar navItems={navItems} />
        </main>
    )
}

export default ProjectPage