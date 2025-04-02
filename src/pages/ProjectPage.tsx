import { BoxReveal } from '@/components/magicui/box-reveal';
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Atom, Bookmark, Boxes, Cloud, Code2, Database, Dribbble, ExternalLink, Eye, FileCode2, Github, Globe, Layers, LayoutGrid, Package, Palette, PencilRuler, Pickaxe, Server, Share, Terminal, ThumbsUp, Trophy, Vault } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from "framer-motion";
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import FloatingNavbar from '@/components/FloatingNavbar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TechIcon } from '@/assets/TechIcons';
import { NumberTicker } from '@/components/magicui/number-ticker';
// import { Project, projects } from '@/assets/ProjectData';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectBySlug } from '@/hooks/useProjectBySlug';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FontLoader from '@/components/project/FontLoader';
import { useProjectLike } from '@/hooks/useProjectLike';
const technologies = ['React', "Tailwind CSS", "TypeScript", "Javascript", 'PHP', "Angular", 'Vite', 'Next JS', 'Figma']




const ProjectPage = () => {

    // 1. All hooks must be called at the top level
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [selectedFont, setSelectedFont] = useState(0);
    const [activeTab, setActiveTab] = useState('creator');
    const { data: project, isLoading, isError, error } = useProjectBySlug(slug);
    // const { isLiked, likeCount, toggleLike, isLikeLoading } = useProjectLike(project?.id);


    // 2. Use useMemo for derived state to avoid recalculation
    const projectData = useMemo(() => {
        if (!project) return {
            ProjectType: '',
            Tools: [],
            ColorPallete: [],
            Typography: [],
            Highlights: [],
            Elements: [],
            Tags: [],
            visibleSections: ['creator']
        };

        const ProjectType = project.project_type;
        const Tools = ProjectType === 'Development'
            ? project.tech_stack
            : project.design_tools;
        const ColorPallete = project.color_palette || [];
        const Typography = project.typography || [];
        const Highlights = project.highlights || [];
        const Elements = project.elements || [];
        const Tags = project.tags || [];



        // Determine which sections are visible based on data
        const visibleSections = ['creator']; // These are always visible

        if (Elements && Elements.length > 0) visibleSections.push('elements');
        if (Highlights && Highlights.length > 0) visibleSections.push('highlights');
        if (Tools && Tools.length > 0) visibleSections.push('tools');
        if (ColorPallete && ColorPallete.length > 0) visibleSections.push('colorpalette');
        if (Typography && Typography.length > 0) visibleSections.push('font');

        return {
            ProjectType,
            Tools,
            ColorPallete,
            Typography,
            Highlights,
            Elements,
            visibleSections
        };
    }, [project]);

    // 3. Define navItems outside of render logic
    const navItems = [
        { id: 'creator', label: 'Creator', icon: LayoutGrid },
        { id: 'details', label: 'Details', icon: Layers },
        { id: 'elements', label: 'Elements', icon: Layers },
        { id: 'highlights', label: 'Highlights', icon: Trophy },
        { id: 'tools', label: 'Tools', icon: Code2 },
        { id: 'colorpalette', label: 'Colors', icon: Palette },
        { id: 'font', label: 'Font', icon: Palette }
    ];

    // 4. All useEffects must be at the top level
    useEffect(() => {
        if (projectData.visibleSections.length > 0 && activeTab === 'creator') {
            setActiveTab(projectData.visibleSections[0]);
        }
    }, [projectData.visibleSections, activeTab]);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 300; // Offset to trigger earlier

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveTab(navItems[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navItems]);

    // 5. Early return for loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Destructure for easier access
    const { ProjectType, Tools, ColorPallete, Typography, Highlights, Elements, visibleSections,Tags } = projectData;


    return (
        <main className="   mx-auto md:px-30 px-3 bg-background relative">
            <ScrollProgress className="top-[0px] " />

            <div className='my-15 md:my-30 '>

                <div className='flex items-center gap-6 mt-30 mb-6 justify-center' id='creator'>


                    {project?.github_url &&
                        <a href={project?.live_url} target='_blank' rel='noopener noreferrer'>
                            <Github strokeWidth={1.5} className='stroke-muted-foreground hover:stroke-secondary-foreground' size={35} />
                        </a>}
                    <Bookmark strokeWidth={1.5} className='stroke-muted-foreground hover:stroke-secondary-foreground' size={35} />
                    <Share strokeWidth={1.5} className='stroke-muted-foreground hover:stroke-secondary-foreground' size={35} />
                    <a href={project?.live_url} target='_blank' rel='noopener noreferrer'>
                        <Globe strokeWidth={1.5} className='stroke-muted-foreground hover:stroke-secondary-foreground' size={35} />
                    </a>
                </div>

                <div className='mb-30 flex items-center  gap-2 flex-col'>
                    <TextGenerateEffect className='text-4xl tracking-tight md:text-6xl text-center text-accent-foreground font-semibold' words={project?.title ?? ''} />
                    <div className='flex items-center gap-2 mt-3 cursor-pointer'>
                        <Avatar className='size-9'>
                            <AvatarImage src='https://github.com/shadcn.png' />
                        </Avatar>
                        <p className='text-xl md:text-3xl  underline hover:text-foreground text-accent-foreground font-semibold'>{project?.users?.name}</p>
                    </div>
                </div>

                <div className='mb-30 space-y-4'>
                    {project?.project_media?.map((media, index) => (
                        <img key={index} className=' w-full h-full object-cover'
                            src={media?.media_url} alt="" />
                    ))}
                </div>

                <h1 className='text-2xl md:text-4xl text-center tracking-wide leading-tight font-light mb-30 md:mb-40'>
                    {project?.description}
                </h1>

                <div className='flex items-center gap-3 justify-between' id='elements'>
                    <div className='border-b w-full '></div>
                    <h3 className='text-xl text-center font-light'>Elements</h3>
                    <div className='border-b w-full '></div>
                </div>

                {Elements && Elements.length > 0 && (

                    <div className='mt-20'>
                        <h1 className='text-3xl text-start font-semibold'>
                            Keep the focus<br />
                            in these Elements<span className='text-[#7c3df1]'>.</span>
                        </h1>

                        <div className='grid  grid-cols-1 md:grid-cols-2 gap-24 md:gap-10 items-center mt-14 md:mt-20'>
                            {project?.elements?.map((element, index) => (

                                <div key={index} className='flex flex-col gap-10 group relative'>
                                    <div className='w-full h-[20rem] md:h-[32rem] hover:brightness-90 transition-all duration-300'>
                                        <img src={element?.imageUrl} className='rounded-xl w-full h-full object-cover' alt="" />
                                    </div>
                                    <div className="absolute bg-gradient-to-t rounded-b-2xl from-neutral-800  opacity-0 group-hover:opacity-100 flex items-center justify-between px-4 pt-8 pb-5  bottom-0 left-0 w-full transition-opacity duration-200 ease-in-out">
                                        <h2 className="text-2xl font-medium text-white">{element?.elementText}</h2>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {Highlights && Highlights.length > 0 && (
                    <div className='mt-20 ' id='highlights'>
                        <h1 className='text-3xl text-start font-semibold'>
                            See the highlights<br />
                            of this website<span className='text-[#7c3df1]'>.</span>
                        </h1>

                        <div className='grid  grid-cols-1 md:grid-cols-2 gap-24 md:gap-10 items-center mt-14 md:mt-20'>
                            {project?.highlights?.map((highlight, index) => (

                                <div key={index} className='flex flex-col gap-10 '>
                                    <div className='w-full h-[20rem] md:h-[27rem] border rounded-2xl'>
                                        <img src={highlight?.imageUrl} className='rounded-xl w-full h-full object-cover' alt="" />
                                    </div>
                                    <h2 className="text-2xl font-medium">{highlight.highlightText}</h2>

                                </div>
                            ))}
                        </div>

                    </div>
                )}

                <div className='mt-40 md:mt-2 md:pt-80 flex md:flex-row flex-col justify-center gap-11 md:gap-0 md:justify-between items-center' id='tools'>
                    {ProjectType === "Development" && <h1 className='text-3xl  self-start text-start font-semibold'>This website has<br /> been created using...</h1>}
                    {ProjectType === "Design" && <h1 className='text-3xl  self-start text-start font-semibold'>This design has<br /> been archived using...</h1>}
                    <div className='flex flex-wrap gap-10  items-center  justify-center'>
                        {Tools?.map((tool, index) => (
                            <TooltipProvider key={index}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <TechIcon icon={tool.icon} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{tool.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                </div>

                <div className='mt-60' id='colorpalette'>
                    <div className='flex items-center gap-3 justify-between mb-20'>
                        <div className='border-b w-full '></div>
                        <h3 className='text-xl text-center whitespace-nowrap font-light'>Color Palette</h3>
                        <div className='border-b w-full '></div>
                    </div>

                    <div className='relative flex justify-center '>
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
                            //    animate={{ x: 0 }}
                            className='w-98 h-98  rounded-2xl flex justify-end' style={{ backgroundColor: ColorPallete[1] }}>
                            <div className='w-68 h-98 rounded-2xl' style={{ backgroundColor: ColorPallete[0] }}> </div>
                        </motion.div>
                    </div>
                </div>

                <div className='mt-60' id='font'>
                    <div className='flex items-center gap-3 justify-between mb-20'>
                        <div className='border-b w-full '></div>
                        <h3 className='text-xl text-center whitespace-nowrap font-light'>Typography</h3>
                        <div className='border-b w-full '></div>
                    </div>
                    <div className='flex text-muted-foreground  items-center border-b  border-dashed w-1/3 mx-auto  justify-center gap-10'>
                        {Typography?.map((font, index) => (
                            <span
                                className={`hover:text-accent-foreground ${selectedFont === index && "text-foreground underline"} cursor-pointer`}
                                onClick={() => setSelectedFont(index)}>
                                {font.font_family}
                            </span>
                        ))}

                    </div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1 } }}
                        className='mt-10 space-y-6'>
                        {Typography && Typography.length > 0 && (
                            <div
                                className='text-center'
                                style={{
                                    fontFamily: Typography[selectedFont]?.font_family || 'inherit',
                                    fontWeight: 500
                                }}
                            >
                                <FontLoader fontFamily={Typography[selectedFont]?.font_family} />
                                <h1 className='text-6xl transition-transform hover:scale-110 mb-4'>{Typography[selectedFont]?.font_family}</h1>

                            </div>
                        )}
                    </motion.div>

                    <div className='mt-40 '>
                        <div className='flex items-center gap-3 justify-between mb-15'>
                            <div className='border-b w-full '></div>
                            <h3 className='text-xl text-center whitespace-nowrap font-light'>Tags in this Project</h3>
                            <div className='border-b w-full '></div>
                        </div>

                        <div className='flex items-center justify-center flex-wrap gap-4'>
                            {Tags && Tags.length > 0 ? (
                                Tags.map((tag, index) => (
                                    <span key={index} className='py-3 px-4 border-foreground border rounded-full'>{tag}</span>
                                ))
                            ) : (
                                <span className='text-muted-foreground'>No tags added</span>
                            )}
                        </div>
                    </div>



                </div>

            </div>
            <FloatingNavbar
                navItems={navItems}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                visibleSections={visibleSections}
                liveUrl={project?.live_url}
                projectId={project?.id}
            />
        </main>
    )

};
export default ProjectPage