import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Trash } from 'lucide-react';
import { TechStack } from '@/types/projectTypes';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ProjectToolsProps {
  selectedTools: TechStack[];
  projectType: string;
  updateTools: (tools: TechStack[]) => void;
}

export const ProjectTools = ({
  selectedTools,
  projectType,
  updateTools
}: ProjectToolsProps) => {
  const [open, setOpen] = useState(false);
  
  // Define frameworks with icons for the dropdown
  const frameworks = [
    { value: "next.js", label: "Next.js", icon: "nextjs" },
    { value: "sveltekit", label: "SvelteKit", icon: "sveltekit" },
    { value: "nuxt.js", label: "Nuxt.js", icon: "nuxtjs" },
    { value: "remix", label: "Remix", icon: "remix" },
    { value: "astro", label: "Astro", icon: "astro" },
    { value: "tailwindcss", label: "Tailwind CSS", icon: "tailwindcss" },
    { value: "react", label: "React", icon: "react" },
    { value: "vue", label: "Vue", icon: "vue" },
    { value: "angular", label: "Angular", icon: "angular" },
    { value: "bootstrap", label: "Bootstrap", icon: "bootstrap" },
    { value: "figma", label: "Figma", icon: "figma" },
    { value: "photoshop", label: "Photoshop", icon: "photoshop" },
    { value: "illustrator", label: "Illustrator", icon: "illustrator" },
    { value: "sketch", label: "Sketch", icon: "sketch" },
    { value: "xd", label: "Adobe XD", icon: "xd" },
  ];
  
  return (
    <div className='mb-30 flex justify-between'>
      <h1 className='text-3xl font-semibold mb-10'>
        {projectType === 'Development' ? 'Tech Stack' : 'Design Tools'}
      </h1>

      {/* Display selected tools */}
      <div className='flex flex-wrap mx-10 gap-2 mb-4'>
        {selectedTools.map((tool, index) => (
          <div key={index} className='bg-gray-100 px-3 py-1 rounded-md flex items-center gap-2'>
            <span>{tool.name}</span>
            <Button
              variant="ghost"
              size="sm"
              className='h-6 w-6 p-0 rounded-full'
              onClick={() => {
                const newTools = [...selectedTools];
                newTools.splice(index, 1);
                updateTools(newTools);
              }}
            >
              <Trash size={12} />
            </Button>
          </div>
        ))}
      </div>

      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              Select tools...
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search tools..." className="h-9" />
              <CommandList>
                <CommandEmpty>No tool found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        // Find the selected framework
                        const selectedFramework = frameworks.find(f => f.value === currentValue);
                        if (selectedFramework) {
                          // Check if already selected
                          const alreadySelected = selectedTools.some(
                            tool => tool.icon === selectedFramework.icon
                          );

                          // If not already selected, add it
                          if (!alreadySelected) {
                            updateTools([
                              ...selectedTools,
                              {
                                icon: selectedFramework.icon,
                                name: selectedFramework.label
                              }
                            ]);
                          }
                        }
                        setOpen(false);
                      }}
                    >
                      {framework.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedTools.some(tool => tool.name === framework.label)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
