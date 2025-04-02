
import { ProjectCard } from '@/components/project/ProjectCard'
import ProjectOfWeek from '@/components/project/ProjectOfWeek'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useProjects } from '@/hooks/useProject'
import { projectList } from '@/lib/projectList'
import { log } from 'console'

import React from 'react'

const HomePage = () => {

    const { data: projects, isLoading, error } = useProjects();
    console.log('Projects:', projects);

    return (
        <main className='bg-background'>

            <div className='container  mx-auto relative'>
                {/* ----project of day--- */}
                {/* <ProjectOfWeek /> */}

                <div className="relative flex flex-col items-center justify-center my-30 text-center px-6">
                    {/* Background images (placeholders for now) */}
                   

                    <h1 className="text-5xl md:text-8xl  font-bold text-accent-foreground">
                        Build<br/> <span className="text-purple-600">Showcase</span><br/> Get Noticed
                    </h1>
                    <p className="mt-10 text-gray-500 max-w-xl">
                    Bring your ideas to life, showcase your achievements, and collaborate with like-minded creators. Projex helps you get noticed in the creative community.                    </p>

                    {/* <div className="mt-6 flex gap-4">
                        <button className="bg-blue-600 text-white font-medium py-2 px-6 rounded-full hover:bg-blue-700 transition">
                            Hire a Freelancer
                        </button>
                        <button className="bg-gray-200 text-black font-medium py-2 px-6 rounded-full hover:bg-gray-300 transition">
                            Try Behance Pro
                        </button>
                    </div> */}
                </div>

                

                <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-14 md:grid-cols-3 lg:gap-10 xl:max-h-[34rem] ">
                    {projects?.map((project) => (
                        <div>
                            <ProjectCard project={project} />
                            <div className='flex items-center gap-2 mt-3'>
                                <Avatar className='size-6'>
                                    <AvatarImage src={project.users.avatar_url} />
                                </Avatar>
                                <p className='text-sm'>{project.users.name}</p>
                            </div>
                        </div>
                    ))}
                </ul>

            </div>
        </main>
    )
}

export default HomePage