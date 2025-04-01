import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { TooltipProvider, TooltipTrigger, Tooltip, TooltipContent } from '@/components/ui/tooltip';
import { Check, ChevronsUpDown, Palette, Plus, Trash, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful';
import toast, { Toaster } from 'react-hot-toast';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';
// Add this import at the top of your file
import WebFont from 'webfontloader';
import { supabase } from '@/api/supabaseClient';
import { useAuth } from '@/context/authContext';
import { Project, TechStack, Typography } from '@/types/projectTypes';
import { useNavigate } from 'react-router-dom';
import { MediaType, ProjectMedia } from '@/types/mediaTypes';



// Define interfaces for elements and highlights// Define interfaces for form data
interface ElementForm {
    imageUrl: string;
    elementText: string;
    file: File;
}

interface HighlightForm {
    imageUrl: string;
    highlightText: string;
    file: File;
}

const AddNewProject = () => {

    const navigate = useNavigate();
    const { user } = useAuth();

    // Project data states
    const [projectName, setProjectName] = useState<string>('');
    const [projectDescription, setProjectDescription] = useState<string>('');
    const [projectType, setProjectType] = useState<string>("Development"); // Default to Development
    const [githubUrl, setGithubUrl] = useState<string>('');
    const [liveUrl, setLiveUrl] = useState<string>('');

    // Media states
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [elements, setElements] = useState<ElementForm[]>([]);
    const [highlights, setHighlights] = useState<HighlightForm[]>([]);

    // Style states
    const [colorPalette, setColorPalette] = useState<string[]>([]);
    const [newColor, setNewColor] = useState<string>('#000000');
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [selectedTools, setSelectedTools] = useState<TechStack[]>([]);
    const [fonts, setFonts] = useState<string[]>([]);
    const [newFont, setNewFont] = useState<string>('');

    // UI states
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState<{
        name?: string;
        images?: string;
    }>({});

    // Load fonts when component mounts or fonts change
    useEffect(() => {
        if (fonts.length > 0) {
            WebFont.load({
                google: {
                    families: fonts
                }
            });
        }
    }, [fonts]);

    // Function to handle file uploads and generate previews
    const handleFileUpload = (newFiles: File[]) => {
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
        setFormErrors(prev => ({ ...prev, images: undefined }));

        // Generate previews for new files
        newFiles.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        setPreviews(prev => [...prev, e.target!.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                // For non-image files, add a placeholder
                setPreviews(prev => [...prev, '']);
            }
        });
    };

    // Function to handle element uploads
    const handleElementUpload = (file: File) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    const newElement: ElementForm = {
                        imageUrl: e.target.result as string,
                        elementText: '',
                        file: file
                    };
                    setElements(prev => [...prev, newElement]);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to handle highlight uploads
    const handleHighlightUpload = (file: File) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    const newHighlight: HighlightForm = {
                        imageUrl: e.target.result as string,
                        highlightText: '',
                        file: file
                    };
                    setHighlights(prev => [...prev, newHighlight]);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to update element name
    const updateElementName = (index: number, name: string) => {
        const updatedElements = [...elements];
        updatedElements[index].elementText = name;
        setElements(updatedElements);
    };

    // Function to update highlight description
    const updateHighlightDescription = (index: number, description: string) => {
        const updatedHighlights = [...highlights];
        updatedHighlights[index].highlightText = description;
        setHighlights(updatedHighlights);
    };

    // Function to remove an element
    const removeElement = (index: number) => {
        const newElements = [...elements];
        newElements.splice(index, 1);
        setElements(newElements);
    };

    // Function to remove a highlight
    const removeHighlight = (index: number) => {
        const newHighlights = [...highlights];
        newHighlights.splice(index, 1);
        setHighlights(newHighlights);
    };

    // Function to remove a file
    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);

        // Also remove the preview
        const newPreviews = [...previews];
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    // Function to add a new color to the palette
    const addColorToPalette = () => {
        if (newColor && !colorPalette.includes(newColor)) {
            setColorPalette([...colorPalette, newColor]);
            setNewColor('#000000');
            setShowColorPicker(false);
        }
    };

    // Function to remove a color from the palette
    const removeColorFromPalette = (index: number) => {
        const updatedPalette = [...colorPalette];
        updatedPalette.splice(index, 1);
        setColorPalette(updatedPalette);
    };

    // Function to add a font
    const addFont = () => {
        if (newFont && !fonts.includes(newFont)) {
            const updatedFonts = [...fonts, newFont];
            setFonts(updatedFonts);
            setNewFont('');

            // Load the new font
            WebFont.load({
                google: {
                    families: [newFont]
                }
            });
        }
    };

    // Function to remove a font
    const removeFont = (index: number) => {
        const updatedFonts = [...fonts];
        updatedFonts.splice(index, 1);
        setFonts(updatedFonts);
    };

    // Function to validate form
    const validateForm = (): boolean => {
        const errors: { name?: string; images?: string } = {};

        if (!projectName.trim()) {
            errors.name = "Project name is required";
        }

        if (files.length === 0) {
            errors.images = "At least one project image is required";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Function to upload a file to Supabase storage
    const uploadFileToStorage = async (file: File, bucket: string, path: string): Promise<string> => {
        const fileExt = file.name.split('.').pop();
        const uniqueId = `${crypto.randomUUID()}-${Date.now()}`;
        const fileName = `${path}/${uniqueId}.${fileExt}`;

        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(fileName, file);

        if (error) {
            throw new Error(`Error uploading file: ${error.message}`);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(fileName);

        return publicUrl;
    };

    // Function to handle form submission
    // Function to handle form submission
    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        setIsSubmitting(true);

        try {
            // Get user ID from auth context
            const userId = user?.id;
            if (!userId) {
                throw new Error("User not authenticated");
            }

            // Upload element images
            const uploadedElements: Element[] = await Promise.all(
                elements.map(async element => ({
                    imageUrl: await uploadFileToStorage(element.file, 'project-images', `${userId}/elements`),
                    elementText: element.elementText
                }))
            );

            // Upload highlight images
            const uploadedHighlights: Highlight[] = await Promise.all(
                highlights.map(async highlight => ({
                    imageUrl: await uploadFileToStorage(highlight.file, 'project-images', `${userId}/highlights`),
                    highlightText: highlight.highlightText
                }))
            );

            // Create typography array from fonts
            const typography: Typography[] = fonts.map(font => ({
                font_family: font
            }));

            // Create project data - WITHOUT project_media
            const projectData = {
                user_id: userId,
                title: projectName,
                description: projectDescription,
                github_url: githubUrl || undefined,
                live_url: liveUrl || undefined,
                project_type: projectType,
                tech_stack: projectType === 'Development' ? selectedTools : undefined,
                design_tools: projectType === 'Design' ? selectedTools : undefined,
                color_palette: colorPalette.length > 0 ? colorPalette : undefined,
                typography: typography.length > 0 ? typography : undefined,
                highlights: uploadedHighlights.length > 0 ? uploadedHighlights : undefined,
                elements: uploadedElements.length > 0 ? uploadedElements : undefined,
                likes: [],
                created_at: new Date().toISOString()
            };

            // Insert project into Supabase
            const { data, error } = await supabase
                .from('projects')
                .insert(projectData)
                .select();

            if (error) {
                throw new Error(`Error inserting project: ${error.message}`);
            }

            // Now that we have the project ID, upload and insert the media
            if (data && data[0]) {
                const projectId = data[0].id;

                // Upload main project images and create media records
                for (const file of files) {
                    const mediaUrl = await uploadFileToStorage(file, 'project-images', `${userId}/main`);
                    const mediaType: MediaType = file.type.startsWith('video/') ? 'video' : 'image';

                    // Insert into project_media table
                    const { error: mediaError } = await supabase
                        .from('project_media')
                        .insert({
                            id: crypto.randomUUID(),
                            project_id: projectId,  // Foreign key to projects table
                            media_url: mediaUrl,
                            media_type: mediaType,
                            created_at: new Date().toISOString()
                        });

                    if (mediaError) {
                        console.error('Error inserting media:', mediaError);
                        // Continue with other media even if one fails
                    }
                }
            }

            toast.success("Your project has been created successfully");

            // Navigate to project page or dashboard
            navigate('/dashboard');

        } catch (error) {
            console.error('Error submitting project:', error);
            toast.error(error instanceof Error ? error.message : "An error occurred while submitting your project");
        } finally {
            setIsSubmitting(false);
        }
    };


    // Function to handle cancel
    const handleCancel = () => {
        navigate('/dashboard');
    };

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
        <main className='w-2/3 mx-auto'>
            <div className='flex justify-between my-10'>
                <Button size={'lg'} variant={'outline'} onClick={handleCancel}>Cancel</Button>
                <Button size={'lg'} onClick={handleSubmit} >Submit</Button>
            </div>

            <div className='py-10'>
                <div className=''>
                    <input type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder='Your Project Name'
                        className='w-full p-3 text-3xl font-semibold hover:ring-3 focus:outline-2 focus:outline-blue-400 text-center rounded-xl hover:ring-purple-200' />
                </div>

                {/* -------Image------- */}
                <div className=' mt-10 '>
                    {/* Display selected files */}
                    {files.length > 0 && (
                        <div className="mt-6 space-y-10 ">
                            {files.map((file, index) => (
                                <div key={index} className="group hover:brightness-90 transition-all duration-200 ease-in-out relative  rounded-xl">
                                    <div className="bg-gray-100 flex items-center justify-center rounded-2xl">
                                        {file.type.startsWith('image/') && previews[index] ? (
                                            <img
                                                src={previews[index]}
                                                alt={file.name}
                                                className="group-hover:ring-3 group-hover:ring-purple-200 rounded-xl object-contain"
                                            />
                                        ) : (
                                            <div className="text-center p-4">
                                                <div className="text-4xl mb-2">📄</div>
                                                <div className="text-xs text-gray-500">{file.type || 'Unknown type'}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 absolute z-10 bottom-0 flex w-full justify-between p-10 backdrop-blur-lg rounded-b-2xl">
                                        <div>
                                            <p className="font-medium truncate" title={file.name}>{file.name}</p>
                                            <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                                        </div>
                                        <Button
                                            variant="destructive"
                                            size={'icon'}
                                            className='rounded-full size-14'
                                            onClick={() => removeFile(index)}
                                        >
                                            <Trash color='white' />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <label htmlFor="file-upload" className='border-2 border-dashed flex flex-col items-center justify-center border-gray-300 rounded-lg p-10 mt-4 cursor-pointer hover:bg-gray-50 transition-colors'>
                    <div className='size-20'>
                        <img src="/src/assets/uploadimg.png" className='w-full' alt="" />
                    </div>
                    <p className='text-gray-500 font-semibold'>Drag and drop image or Upload</p>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                handleFileUpload(Array.from(e.target.files));
                            }
                        }}
                        multiple
                    />
                </label>

                {/* -------Description------- */}
                <input type="text"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder='Write a description'
                    className=' mt-20 w-full p-3 text-2xl md:text-3xl text-center tracking-wide leading-tight font-light hover:ring-3 focus:outline-2 focus:outline-blue-400 rounded-xl hover:ring-purple-200' />

                {/* ----------Elements------------ */}
                <div className='my-20'>
                    <h1 className='text-3xl font-semibold' >Elements</h1>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-x-8 md:gap-y-30 items-center mt-14 md:mt-20'>

                        {/* ---------element previews ------- */}
                        {elements.map((element, index) => (
                            <div key={index} className='flex flex-col gap-10 group relative'>
                                <div className='w-full h-[20rem] md:h-[32rem] hover:brightness-90 transition-all duration-300'>
                                    <img
                                        src={element.imageUrl}
                                        className='rounded-xl w-full h-full object-cover'
                                        alt={element.elementText || "Element preview"}
                                    />
                                    <input
                                        type="text"
                                        placeholder='Enter Element Name'
                                        value={element.elementText}
                                        onChange={(e) => updateElementName(index, e.target.value)}
                                        className="w-full text-2xl mt-2 font-medium hover:ring-3 focus:outline-2 focus:outline-blue-400 rounded-md p-4 hover:ring-purple-200"
                                    />
                                    <Button
                                        variant="destructive"
                                        size={'icon'}
                                        className='rounded-full size-10 absolute top-2 right-2'
                                        onClick={() => removeElement(index)}
                                    >
                                        <Trash color='white' size={16} />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {/* ---------element image input box------- */}
                        <label htmlFor="element-upload" className='group md:h-[32rem] border-2 border-neutral-300 border-dashed rounded-2xl cursor-pointer'>
                            <div className='w-full h-full flex flex-col gap-10 justify-center items-center'>
                                <img src='/src/assets/uploadimg.png' className='rounded-xl group-hover:scale-110 transition-all duration-200 size-20 object-cover' alt="" />
                                <p className='text-lg flex items-center gap-2 text-neutral-600'><Upload />Add An Element</p>
                                <input
                                    id="element-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            handleElementUpload(e.target.files[0]);
                                            // Reset the input value so the same file can be selected again
                                            e.target.value = '';
                                        }
                                    }}
                                />
                            </div>
                        </label>
                    </div>
                </div>

                {/* ----------Highlights------------ */}
                <div className='my-20'>
                    <h1 className='text-3xl font-semibold'>Highlights</h1>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-x-8 md:gap-y-30 items-center mt-14 md:mt-20'>

                        {/* ---------highlight previews ------- */}
                        {highlights.map((highlight, index) => (
                            <div key={index} className='flex flex-col gap-10 group relative'>
                                <div className='w-full h-[20rem] md:h-[32rem] hover:brightness-90 transition-all duration-300'>
                                    <img
                                        src={highlight.imageUrl}
                                        className='rounded-xl w-full h-full object-cover'
                                        alt={highlight.highlightText || "Highlight preview"}
                                    />
                                    <textarea
                                        placeholder='Enter Highlight Description'
                                        value={highlight.highlightText}
                                        onChange={(e) => updateHighlightDescription(index, e.target.value)}
                                        className="w-full text-lg mt-2 font-medium hover:ring-3 focus:outline-2 focus:outline-blue-400 rounded-md p-4 hover:ring-purple-200 min-h-[100px] resize-y"
                                    />
                                    <Button
                                        variant="destructive"
                                        size={'icon'}
                                        className='rounded-full size-10 absolute top-2 right-2'
                                        onClick={() => removeHighlight(index)}
                                    >
                                        <Trash color='white' size={16} />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {/* ---------highlight image input box------- */}
                        <label htmlFor="highlight-upload" className='group md:h-[32rem] border-2 border-neutral-300 border-dashed rounded-2xl cursor-pointer'>
                            <div className='w-full h-full flex flex-col gap-10 justify-center items-center'>
                                <img src='/src/assets/uploadimg.png' className='rounded-xl group-hover:scale-110 transition-all duration-200 size-20 object-cover' alt="" />
                                <p className='text-lg flex items-center gap-2 text-neutral-600'><Upload />Add A Highlight</p>
                                <input
                                    id="highlight-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            handleHighlightUpload(e.target.files[0]);
                                            // Reset the input value so the same file can be selected again
                                            e.target.value = '';
                                        }
                                    }}
                                />
                            </div>
                        </label>
                    </div>
                </div>

                {/* -----------Tech Stack or Design Tools---------- */}
                <div className='mb-30 flex justify-between'>
                    <h1 className='text-3xl font-semibold mb-10'>Tools</h1>

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
                                        setSelectedTools(newTools);
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
                                                                setSelectedTools([
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


                {/* -----------Color Palette---------- */}
                <div className=''>
                    <h1 className='text-3xl font-semibold mb-10'>Color Palette</h1>

                    <div className='flex flex-col gap-6'>
                        {/* Display existing colors */}
                        <div className='flex flex-wrap gap-4'>
                            {colorPalette.map((color, index) => (
                                <div key={index} className='relative group'>
                                    <div
                                        className='h-16 w-16 rounded-md border shadow-sm cursor-pointer flex items-center justify-center'
                                        style={{ backgroundColor: color }}
                                    >
                                        <span className='text-xs font-mono opacity-0 group-hover:opacity-100 bg-white/80 px-2 py-1 rounded'>
                                            {color}
                                        </span>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size={'icon'}
                                        className='rounded-full size-6 absolute -top-2 -right-2 opacity-0 group-hover:opacity-100'
                                        onClick={() => removeColorFromPalette(index)}
                                    >
                                        <Trash color='white' size={12} />
                                    </Button>
                                </div>
                            ))}
                        </div>


                        {/* Add new color */}
                        <div className='flex gap-4 items-center'>
                            <div className='relative'>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>

                                            <div className='p-3 rounded-xl flex border item-center justify-center ' onClick={() => setShowColorPicker(!showColorPicker)}>
                                                <Palette color='purple' />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>Pick Color</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                {/* <div 
                                            className='h-12 w-12 rounded-md border shadow-sm cursor-pointer'
                                            style={{ backgroundColor: newColor }}
                                            onClick={() => setShowColorPicker(!showColorPicker)}
                                        /> */}

                                {showColorPicker && (
                                    <div className='absolute z-10 mt-2'>
                                        <div
                                            className='fixed inset-0 '
                                            onClick={() => setShowColorPicker(false)}
                                        />
                                        <HexColorPicker
                                            color={newColor}
                                            onChange={setNewColor}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className='px-4 flex items-center border justify-center hover:ring-3 focus-within:outline-2 focus-within:outline-blue-400 rounded-md hover:ring-purple-200'>
                                <input
                                    type="text"
                                    value={newColor}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        if (value.charAt(0) !== '#' && value.length > 0) {
                                            value = '#' + value;
                                        }
                                        setNewColor(value);
                                    }}
                                    placeholder='Enter Hex Value'
                                    className="w-full text-lg p-3 font-medium focus:outline-none"
                                />
                            </div>

                            <Button
                                onClick={addColorToPalette}
                                disabled={!newColor.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)}
                                className='flex items-center gap-2'
                            >
                                <Plus size={18} /> Add Color
                            </Button>
                        </div>
                    </div>
                </div>

                {/* ------typography----- */}
                {/* -----------Fonts Used---------- */}
                <div className='my-20'>
                    <h1 className='text-3xl font-semibold mb-10'>Fonts Used</h1>

                    <div className='flex flex-col gap-6'>
                        {/* Display existing fonts */}
                        {fonts.length > 0 && (
                            <div className='flex flex-wrap gap-3'>
                                {fonts.map((font, index) => (
                                    <div key={index} className='relative group px-4 py-2 border rounded-lg hover:shadow-md transition-all flex items-center gap-2'>
                                        <h3
                                            className='text-lg font-medium'
                                            style={{ fontFamily: `'${font}', sans-serif` }}
                                        >
                                            {font}
                                        </h3>
                                        <Button
                                            variant="ghost"
                                            size={'icon'}
                                            className='rounded-full size-6 ml-1'
                                            onClick={() => removeFont(index)}
                                        >
                                            <Trash size={14} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add new font */}
                        <div className='flex gap-4 items-center'>
                            <div className='flex-1 px-4 flex items-center border justify-center hover:ring-3 focus-within:outline-2 focus-within:outline-blue-400 rounded-md hover:ring-purple-200'>
                                <input
                                    type="text"
                                    value={newFont}
                                    onChange={(e) => setNewFont(e.target.value)}
                                    placeholder='Enter font name (e.g., Roboto, Open Sans)'
                                    className="w-full text-lg p-3 font-medium focus:outline-none"
                                />
                            </div>

                            <Button
                                onClick={addFont}
                                disabled={!newFont.trim()}
                                className='flex items-center gap-2'
                            >
                                <Plus size={18} /> Add Font
                            </Button>
                        </div>

                        {/* Font usage tips */}
                        <div className='mt-2 text-sm text-gray-500'>
                            <p>Tips: Enter font names available on Google Fonts (e.g., Roboto, Lato, Open Sans, Montserrat)</p>
                        </div>
                    </div>
                </div>

            </div>
            <Toaster />
        </main>
    )
}
export default AddNewProject
