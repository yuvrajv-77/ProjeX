import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authContext';
import { Toaster } from 'react-hot-toast';
import { useProjectSubmit } from '@/hooks/useProjectSubmit';
import {
    ProjectBasicInfo,
    ProjectMediaUpload,
    ProjectElements,
    ProjectHighlights,
    ProjectTools,
    ProjectColorPalette,
    ProjectTypography
} from '@/components/project/form';
import { ProjectFormData } from '@/types/projectFormTypes';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import ProjectTags from '@/components/project/form/ProjectTags';


const AddNewProject = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState<ProjectFormData>({
        projectName: '',
        projectDescription: '',
        projectType: 'Development',
        githubUrl: '',
        liveUrl: '',
        files: [],
        elements: [],
        highlights: [],
        colorPalette: [],
        selectedTools: [],
        fonts: [],
        tags: [],
        
    });

    // Form submission hook
    const { handleSubmit, formErrors } = useProjectSubmit(formData, setIsSubmitting);

    // Update form data
    const updateFormData = (field: keyof ProjectFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Handle cancel
    

    return (
        <main className='w-2/3 mx-auto'>
            <div className='flex justify-between my-10'>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button

                            size={'lg'}
                            variant={'outline'}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                           
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => navigate('/')}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <Button
                    size={'lg'}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
            </div>

            <div className='py-10'>
                <ProjectBasicInfo
                    projectName={formData.projectName}
                    projectDescription={formData.projectDescription}
                    githubUrl={formData.githubUrl}
                    liveUrl={formData.liveUrl}
                    projectType={formData.projectType}
                    updateFormData={updateFormData}
                    errors={formErrors}
                />

                <ProjectMediaUpload
                    files={formData.files}
                    updateFiles={(files) => updateFormData('files', files)}
                    errors={formErrors}
                />

                <ProjectElements
                    elements={formData.elements}
                    updateElements={(elements) => updateFormData('elements', elements)}
                />

                <ProjectHighlights
                    highlights={formData.highlights}
                    updateHighlights={(highlights) => updateFormData('highlights', highlights)}
                />

                <ProjectTools
                    selectedTools={formData.selectedTools}
                    projectType={formData.projectType}
                    updateTools={(tools) => updateFormData('selectedTools', tools)}
                />

                <ProjectColorPalette
                    colorPalette={formData.colorPalette}
                    updateColorPalette={(colors) => updateFormData('colorPalette', colors)}
                />

                <ProjectTypography
                    fonts={formData.fonts}
                    updateFonts={(fonts) => updateFormData('fonts', fonts)}
                />
                <ProjectTags
                    tags={formData.tags}
                    updateTags={(tags) => updateFormData('tags', tags)}
                />
            </div>
            <Toaster />
        </main>
    );
};

export default AddNewProject;
