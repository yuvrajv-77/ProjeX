import { Globe, ThumbsUp, Vault } from 'lucide-react';
import React, { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const FloatingNavbar = ({ navItems }) => {
    const [activeTab, setActiveTab] = useState('creator');
    return (
        <span className="z-20  border backdrop-blur-3xl bg-white/20 rounded-3xl p-2 flex items-center gap-2 shadow-xl fixed bottom-5 left-1/2 -translate-x-1/2">
            {/* Logo */}

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <div className="h-15 w-15 bg-foreground hover:bg-violet-300 rounded-2xl flex items-center justify-center">
                            <ThumbsUp size={20} className=" stroke-background" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Appreciate</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>



            {/* Navigation Items */}
            <nav className="flex items-center bg-neutral-800 rounded-2xl  p-2  gap-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all duration-200
                        ${activeTab === item.id
                                    ? 'bg-gray-700 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                        >
                            <span className="text-sm font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Visit Site Button */}
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>

                        <button className=" bg-violet-500 hover:bg-violet-600 text-white h-15 w-15  px-5 py-4 rounded-2xl flex items-center gap-2 transition-all duration-200">
                            <Globe size={20} />
                        </button>

                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Visit Site</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </span>
    )
}

export default FloatingNavbar