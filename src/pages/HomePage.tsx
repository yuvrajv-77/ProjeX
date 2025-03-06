
import { ProjectCard } from '@/components/ProjectCard'
import ProjectOfWeek from '@/components/ProjectOfWeek'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { projectList } from '@/lib/projectList'

import React from 'react'

const HomePage = () => {

    return (
        <main className='bg-background'>

            <div className='container  mx-auto relative'>
                {/* ----project of day--- */}
                <ProjectOfWeek />

                <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-14 md:grid-cols-3 lg:gap-10 xl:max-h-[34rem] ">
                    {projectList.map((project) => (
                        <div>
                            <ProjectCard project={project} key={project.id} />
                            <div className='flex items-center gap-2 mt-3'>
                                <Avatar className='size-6'>
                                    <AvatarImage src={project.author.avatar} />
                                </Avatar>
                                <p className='text-sm'>{project.author.name}</p>
                            </div>
                        </div>
                    ))}
                </ul>

            </div>
        </main>
    )
}

export default HomePage