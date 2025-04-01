import { Project } from "@/types/projectTypes";
import { supabase } from "./supabaseClient";


// Function to fetch a project by slug
export const fetchProjectBySlug = async (slug: string): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
        *,
        project_media (*),
        users (*)
      `)
    .eq('slug', slug)
    .single();
console.log('Data:', data);
  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error(`Project with slug "${slug}" not found`);
  }

  return data as Project;
};