import { Globe, ThumbsUp } from 'lucide-react';
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

import { cn } from '@/lib/utils';
import { useProjectLike } from '@/hooks/useProjectLike';


const FloatingNavbar = ({ navItems, activeTab, setActiveTab, liveUrl, visibleSections = [], projectId }) => {
    // const { toast } = useToast();
    
    // Use the project like hook
    const { isLiked, likeCount, toggleLike, isLikeLoading } = useProjectLike(projectId);
    
    // Filter navItems to only show those that have corresponding sections on the page
    const filteredNavItems = navItems.filter(item => visibleSections.includes(item.id));
    
    const handleNavClick = (id) => {
        setActiveTab(id);
        
        // Scroll to the element with the matching ID
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    const handleLikeClick = async () => {
        if (!isLikeLoading) {
            try {
                toggleLike();
            } catch (error) {
                console.error('Error toggling like:', error);
                // toast({
                //     title: "Error",
                //     description: "Failed to update appreciation status",
                //     variant: "destructive"
                // });
            }
        }
    };
    
    return (
        <span className="z-20 border backdrop-blur-3xl bg-white/20 rounded-3xl p-2 flex items-center gap-2 shadow-xl fixed bottom-5 left-1/2 -translate-x-1/2">
            {/* Like Button */}
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button 
                            onClick={handleLikeClick} 
                            disabled={isLikeLoading}
                            className="focus:outline-none"
                        >
                            <div className={cn(
                                "h-15 w-15 rounded-2xl flex items-center justify-center relative transition-all duration-200",
                                isLiked 
                                    ? "bg-violet-500 hover:bg-violet-600" 
                                    : "bg-foreground hover:bg-violet-300",
                                isLikeLoading && "opacity-70 cursor-not-allowed"
                            )}>
                                <ThumbsUp size={20} className="stroke-background" />
                                
                               
                                
                            </div>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isLiked ? 'Appreciated!' : 'Appreciate'}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            {/* Navigation Items */}
            <nav className="flex items-center bg-neutral-800 rounded-2xl p-2 gap-1">
                {filteredNavItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all duration-200
                    ${activeTab === item.id
                                ? 'bg-gray-700 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                    >
                        <span className="text-sm font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Visit Site Button */}
            {liveUrl && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <a 
                                href={liveUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="focus:outline-none"
                            >
                                <div className="bg-violet-500 hover:bg-violet-600 text-white h-15 w-15 px-5 py-4 rounded-2xl flex items-center gap-2 transition-all duration-200">
                                    <Globe size={20} />
                                </div>
                            </a>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Visit Site</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </span> 
    )
}

export default FloatingNavbar