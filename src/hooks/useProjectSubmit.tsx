import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/api/supabaseClient';
import { useAuth } from '@/context/authContext';
import { ProjectFormData, FormErrors } from '@/types/projectFormTypes';
import { MediaType } from '@/types/mediaTypes';
import toast from 'react-hot-toast';

export const useProjectSubmit = (formData: ProjectFormData, setIsSubmitting: (value: boolean) => void) => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const { user } = useAuth();

  // Function to validate form
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.projectName.trim()) {
      errors.name = "Project name is required";
    }
    
    if (formData.files.length === 0) {
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
      .upload(fileName, file, {
        upsert: false
      });
        
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
      const uploadedElements = await Promise.all(
        formData.elements.map(async element => ({
          imageUrl: await uploadFileToStorage(element.file, 'project-images', `${userId}/elements`),
          elementText: element.elementText
        }))
      );
      
      // Upload highlight images
      const uploadedHighlights = await Promise.all(
        formData.highlights.map(async highlight => ({
          imageUrl: await uploadFileToStorage(highlight.file, 'project-images', `${userId}/highlights`),
          highlightText: highlight.highlightText
        }))
      );
      
      // Create typography array from fonts
      const typography = formData.fonts.map(font => ({
        font_family: font
      }));
      
      // Create project data - WITHOUT project_media
      const projectData = {
        user_id: userId,
        title: formData.projectName,
        description: formData.projectDescription,
        github_url: formData.githubUrl || undefined,
        live_url: formData.liveUrl || undefined,
        project_type: formData.projectType,
        tech_stack: formData.projectType === 'Development' ? formData.selectedTools : undefined,
        design_tools: formData.projectType === 'Design' ? formData.selectedTools : undefined,
        color_palette: formData.colorPalette.length > 0 ? formData.colorPalette : undefined,
        typography: typography.length > 0 ? typography : undefined,
        highlights: uploadedHighlights.length > 0 ? uploadedHighlights : undefined,
        elements: uploadedElements.length > 0 ? uploadedElements : undefined,
        likes: [],
        tags: formData.tags.length > 0 ? formData.tags : undefined,
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
        for (const file of formData.files) {
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
      navigate('/profile');
      
    } catch (error) {
      console.error('Error submitting project:', error);
      toast.error(error instanceof Error ? error.message : "An error occurred while submitting your project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, formErrors };
};
