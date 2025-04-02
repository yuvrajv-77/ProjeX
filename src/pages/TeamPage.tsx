
import { BorderBeam } from '@/components/magicui/border-beam';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { ProjectCard } from '@/components/project/ProjectCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/authContext'
import { projectList } from '@/lib/projectList';
import { BriefcaseBusiness, Ellipsis, Globe, Info, Mail, MapPin, UserRoundPlus } from 'lucide-react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



const TeamPage = () => {

    // const { user, loading, session } = useAuth();
    const navigate = useNavigate();
    const teamName = "Unix Bento";
    const teamLogo = "https://cdn.dribbble.com/users/17702019/avatars/normal/90fa185fcd629784fae1eb6abed064d4.jpg?1732494002";
    const teamCoverImg = "https://cdn.dribbble.com/users/17702019/profile/masthead/53a5ab79-9bdd-4c77-9b62-baed3a566c09/Dribbble%20Cover%20-%20V2%20-%20Team.jpg"


    return (
        <main className="  mx-auto  bg-background">
            <div>

                <div className='md:h-70 h-60 relative '>
                    <img src={teamCoverImg} className='h-full w-full object-cover ' alt="" />
                    <span className="absolute -bottom-10 md:left-1/25 left-1/2 -translate-x-1/2 md:translate-x-0  border-3 rounded-full">
                        <img
                            className="rounded-full size-25 object-cover"
                            src={teamLogo}
                            alt=""
                        />
                    </span>
                </div>

                <div className='md:px-16 px-6 gap-y-14 md:gap-0 grid grid-cols-1 md:grid-cols-10 mt-16'>
                    <div className=' col-span-2   md:pr-16 '>
                        <div className=' space-y-1.5 text-sm md:text-start text-center'>
                            <TypingAnimation className="text-3xl font-semibold mb-6" duration={30}>
                                {teamName}
                            </TypingAnimation>

                            <p className='flex items-center md:justify-start justify-center gap-2 '><Info size={15} className=' stroke-zinc-500' />Logo & Brand Identity Designer</p>
                            <p className='flex items-center md:justify-start justify-center gap-2 ' > <BriefcaseBusiness size={15} className=' stroke-zinc-500' />Designer / Since ® 2022</p>
                            <p className='flex items-center md:justify-start justify-center gap-2 '><MapPin size={15} className=' stroke-zinc-500' /> New Zealand</p>
                            <p className='flex items-center md:justify-start justify-center gap-2 underline cursor-pointer'> <Globe size={15} className=' stroke-zinc-500' />bento.me/includ</p>
                        </div>
                        <div className="flex flex-col gap-3 md:gap-5 mt-7">
                            <Button size={"lg"} className="rounded-full w-full h-11">
                                <UserRoundPlus />
                                Follow
                            </Button>
                            <Button
                                size={"lg"}
                                variant={"outline"}
                                className=" w-full h-11 rounded-full"
                            >
                                <Mail />
                                Message
                            </Button>
                            <Button size={"icon"} variant={"secondary"} className="rounded-full w-full h-9"><Ellipsis /></Button>
                        </div>

                        <div className='hidden md:block mt-6 space-y-2 font-light text-sm'>
                            <span className='flex justify-between items-center '>
                                <p>Projects Views</p>
                                <NumberTicker
                                    value={1102}
                                    className="whitespace-pre-wrap text- font-medium tracking-tighter text-black dark:text-white"
                                />
                            </span>
                            <span className='flex justify-between items-center '>
                                <p>Appreciations</p>
                                <NumberTicker
                                    value={952}
                                    className="whitespace-pre-wrap text- font-medium tracking-tighter text-black dark:text-white"
                                />
                            </span>
                            <span className='flex justify-between items-center '>
                                <p>Followers</p>
                                <NumberTicker
                                    value={2614}
                                    className="whitespace-pre-wrap text- font-medium tracking-tighter text-black dark:text-white"
                                />
                            </span>
                            <span className='flex justify-between items-center '>
                                <p>Following</p>
                                <NumberTicker
                                    value={154}
                                    className="whitespace-pre-wrap text- font-medium tracking-tighter text-black dark:text-white"
                                />
                            </span>
                        </div>
                        <div className='hidden md:block mt-10 space-y-2'>
                            <p className='font-medium text-xs text-neutral-500 dark:text-zinc-400'>About Us</p>
                            <p className='text-sm font-light'>Polygraphe is a Montreal based brand identity & communication studio.</p>
                        </div>
                    </div>

                    <div className='  col-span-8 '>
                        <Tabs defaultValue="work" className=" w-full  ">
                            <div className="overflow-x-auto scrollbar-hide">
                                <TabsList className="grid mx-auto md:mx-0  min-w-[400px]  grid-cols-4 ">
                                    <TabsTrigger value="about">About</TabsTrigger>
                                    <TabsTrigger value="work">Work</TabsTrigger>
                                    <TabsTrigger value="collections">Collections</TabsTrigger>
                                    <TabsTrigger value="members">Members</TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent value="work" className="">
                                <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-14 md:grid-cols-3 lg:gap-6 xl:max-h-[34rem] ">
                                    {projectList.map((project) => (
                                        <ProjectCard project={project} key={project.id} />
                                    ))}
                                </ul>

                            </TabsContent>
                            <TabsContent value="collections" className="">
                                Collections
                            </TabsContent>
                            <TabsContent value="about" className="">
                                <div className=' md:hidden mt-6 space-y-2 font-light text-sm'>
                                    <span className='flex justify-between items-center '>
                                        <p>Projects Views</p>
                                        <NumberTicker
                                            value={1102}
                                            className="whitespace-pre-wrap text- font-medium tracking-tighter text-black dark:text-white"
                                        />
                                    </span>
                                    <span className='flex justify-between items-center '>
                                        <p>Appreciations</p>
                                        <NumberTicker
                                            value={952}
                                            className="whitespace-pre-wrap text- font-medium tracking-tighter text-black dark:text-white"
                                        />
                                    </span>
                                    <span className='flex justify-between items-center '>
                                        <p>Followers</p>
                                        <NumberTicker
                                            value={2614}
                                            className="whitespace-pre-wrap text- font-medium tracking-tighter text-black dark:text-white"
                                        />
                                    </span>
                                    <span className='flex justify-between items-center '>
                                        <p>Following</p>
                                        <NumberTicker
                                            value={154}
                                            className="whitespace-pre-wrap text- font-medium tracking-tighter text-black dark:text-white"
                                        />
                                    </span>
                                </div>
                                <div className=' md:hidden my-10 space-y-2'>
                                    <p className='font-medium text-xs text-neutral-500 dark:text-zinc-400'>About Us</p>
                                    <p className='text-sm font-light'>Polygraphe is a Montreal based brand identity & communication studio.</p>
                                </div>
                            </TabsContent>
                            <TabsContent value="members" className="">
                                Members
                            </TabsContent>
                        </Tabs>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default TeamPage