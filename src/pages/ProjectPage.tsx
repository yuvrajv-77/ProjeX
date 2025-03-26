
import { BoxReveal } from '@/components/magicui/box-reveal';
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Atom, Bookmark, Boxes, Cloud, Code2, Database, Dribbble, ExternalLink, Eye, FileCode2, Github, Globe, Layers, LayoutGrid, Package, Palette, PencilRuler, Pickaxe, Server, Share, Terminal, ThumbsUp, Trophy, Vault } from 'lucide-react';
import React, { useEffect, useState } from 'react'

import { ScrollProgress } from '@/components/magicui/scroll-progress';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import FloatingNavbar from '@/components/FloatingNavbar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TechIcon } from '@/assets/TechIcons';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { Project, projects } from '@/assets/ProjectData';
import { useNavigate, useParams } from 'react-router-dom';

const technologies = ['React', "Tailwind CSS", "TypeScript", "Javascript", 'PHP', "Angular", 'Vite', 'Next JS', 'Figma']


const ProjectPage = () => {

    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Find the project with the matching slug
        const foundProject = projects.find(p => p.slug === slug);

        if (foundProject) {
            setProject(foundProject);
        } else {
            // If no project is found, you could redirect to a 404 page or back to home
            console.error(`Project with slug "${slug}" not found`);
            // Optional: navigate to home or 404 page
            // navigate('/');
        }

        setLoading(false);
    }, [slug, navigate]);

    const navItems = [
        { id: 'creator', label: 'Creator', icon: LayoutGrid },
        { id: 'fontcolor', label: 'Font', icon: Palette },
        { id: 'details', label: 'Details', icon: Layers },
        { id: 'elements', label: 'Elements', icon: Layers },
        { id: 'score', label: 'Score', icon: Trophy },
    ];

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!project) {
        return <div className="flex items-center justify-center h-screen">Project not found</div>;
    }

    return (
        <main className="  mx-auto md:px-30 px-3 bg-background relative">
            <ScrollProgress className="top-[0px] " />

            <div className='my-15 md:my-30 '>

                <div className='flex items-center gap-6 mt-50 mb-6 justify-center'>
                    {project.dribbble_url && <Dribbble strokeWidth={1.5} className='stroke-foreground hover:stroke-purple-300' size={35} />}
                    {project.github_url && <Github strokeWidth={1.5} className='stroke-foreground hover:stroke-purple-300' size={35} />}
                    <Bookmark strokeWidth={1.5} className='stroke-foreground hover:stroke-purple-300' size={35} />
                    <Share strokeWidth={1.5} className='stroke-foreground hover:stroke-purple-300' size={35} />
                    <Globe strokeWidth={1.5} className='stroke-foreground hover:stroke-purple-300' size={35} />
                </div>

                <div className='mb-30 flex items-center  gap-2 flex-col'>
                    <TextGenerateEffect className='text-4xl tracking-tight md:text-6xl text-center text-accent-foreground font-semibold' words={project.title} />
                    <div className='flex items-center gap-2 mt-3 cursor-pointer'>
                        <Avatar className='size-9'>
                            <AvatarImage src='https://github.com/shadcn.png' />
                        </Avatar>
                        <p className='text-xl md:text-3xl  underline hover:text-foreground text-accent-foreground font-semibold'>{project.client_name}</p>
                    </div>
                </div>

                <div className='mb-30 space-y-4'>
                    <img className=' w-full h-full object-cover'
                        src={project.images[0]} alt="" />
                    <img className=' w-full h-full object-cover'
                        src={project.images[0]} alt="" />
                    <img className=' w-full h-full object-cover'
                        src={project.images[0]} alt="" />
                </div>



                <h1 className='text-2xl md:text-4xl text-center tracking-wide leading-tight font-light mb-30 md:mb-40'>
                    {project.short_description}
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
                    {project.project_type === "development" && <h1 className='text-3xl  self-start text-start font-semibold'>This website has<br /> been created using...</h1>}
                    {project.project_type === "design" && <h1 className='text-3xl  self-start text-start font-semibold'>This Design has<br /> been archived using...</h1>}
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