import { supabase } from '@/api/supabaseClient';
import { useState, useEffect, useCallback } from 'react';

export const useProjectSearch = (searchQuery: string = '', searchTags: string[] = []) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use useCallback to memoize the fetch function to prevent it from being recreated on every render
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase.from('projects').select('*');
      
      // Filter by tags if provided
      if (searchTags && searchTags.length > 0) {
        query = query.contains('tags', searchTags);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      // If there's a search query, filter the results client-side
      if (searchQuery && searchQuery.trim() !== '') {
        const searchTerm = searchQuery.trim().toLowerCase();
        
        const filteredProjects = data.filter(project => {
          // Search in title
          if (project.title && project.title.toLowerCase().includes(searchTerm)) {
            return true;
          }
          
          // Search in description
          if (project.description && project.description.toLowerCase().includes(searchTerm)) {
            return true;
          }
          
          // Search in tags
          if (project.tags && Array.isArray(project.tags)) {
            if (project.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
              return true;
            }
          }
          
          // Search in tech stack/tools
          if (project.tools && Array.isArray(project.tools)) {
            if (project.tools.some(tool => tool.toLowerCase().includes(searchTerm))) {
              return true;
            }
          }
          
          // Search in elements
          if (project.elements && Array.isArray(project.elements)) {
            if (project.elements.some(element => 
              (element.elementText && element.elementText.toLowerCase().includes(searchTerm))
            )) {
              return true;
            }
          }
          
          return false;
        });
        
        setProjects(filteredProjects || []);
      } else {
        setProjects(data || []);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, searchTags]); // Dependencies for useCallback

  // Use the memoized fetch function in useEffect
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]); // This will only run when fetchProjects changes (which happens when searchQuery or searchTags change)

  return { projects, loading, error };
};
