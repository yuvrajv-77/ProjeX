
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
                <ProjectOfWeek />

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