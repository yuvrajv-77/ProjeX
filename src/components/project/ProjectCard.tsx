

import { Box, Eye, Heart, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "../ui/button";
import { useAuth } from "@/context/authContext";

export function ProjectCard({ project }: any) {
    const { user, loading, session } = useAuth();


    return (
        <li className={`min-h-[14rem] list-none group  `} key={project.id}>
            <div className="relative h-full rounded-3xl">
                <GlowingEffect
                    blur={1}
                    borderWidth={3}
                    spread={90}
                    glow={true}
                    disabled={false}
                    proximity={90}
                    inactiveZone={0.01}
                />
                <div className="relative ">
                    <div>
                        <img className="rounded-3xl h-86 w-full object-cover" src={project.thumbnail} alt="" />
                    </div>
                    <div className="absolute bg-gradient-to-t rounded-b-2xl from-neutral-700  opacity-0 group-hover:opacity-100 flex items-center justify-between px-4 pt-5 pb-4  bottom-0 left-0 w-full transition-opacity duration-200 ease-in-out">
                        <h2 className="text-lg font-medium text-white">{project.projectName}</h2>
                        <span className="text-sm">
                            <button className="p-2 bg-white rounded-full"><Heart size={18} color="black" /></button>
                        </span>
                    </div>
                </div>
            </div>
            
        </li>
    )
}
