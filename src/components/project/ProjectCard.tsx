

import { Box, Eye, Heart, Lock, Search, Settings, Sparkles, ThumbsUp } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "../ui/button";
import { useAuth } from "@/context/authContext";

export function ProjectCard({ project }: any) {
    const { user, loading, session } = useAuth();


    return (
        <li className={`min-h-[14rem] list-none group  `} key={project.id}>
            <div className="relative h-full rounded-2xl">
                <GlowingEffect
                    blur={1}
                    borderWidth={3}
                    spread={60}
                    glow={true}
                    disabled={false}
                    proximity={10}
                    inactiveZone={0.03}
                />
                <div className="relative ">
                    <div>
                        <img className="rounded-xl h-86 w-full object-cover" src={project?.project_media[0]?.media_url} alt="" />
                    </div>
                    <div className="absolute bg-gradient-to-t rounded-b-2xl from-neutral-700  opacity-0 group-hover:opacity-100 flex items-center justify-between px-4 pt-5 pb-4  bottom-0 left-0 w-full transition-opacity duration-200 ease-in-out">
                        <h2 className="text-lg font-medium text-white">{project.title}</h2>
                        <span className="text-sm">
                            <button className="p-2 bg-white rounded-full"><ThumbsUp size={18} color="black" /></button>
                        </span>
                    </div>
                </div>
            </div>
            
        </li>
    )
}
