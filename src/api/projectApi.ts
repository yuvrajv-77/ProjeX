import { supabase } from "./supabaseClient";

export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      project_media ( * ),
      users (*)
    `).order("created_at", { ascending: false });
console.log(data);

  if (error) throw new Error(error.message);
  return data;
  
};
