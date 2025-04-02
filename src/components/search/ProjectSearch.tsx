import { useState, useEffect } from 'react';
import { useProjectSearch } from '@/hooks/useProjectSearch';

const ProjectSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTags, setSearchTags] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // Debounce the search query to prevent too many searches
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // Use the debounced query for search
  const { projects, loading, error } = useProjectSearch(debouncedQuery, searchTags);
  
  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle tag selection
  const handleTagSelect = (tags) => {
    setSearchTags(tags);
  };
  
  return (
    <div>
      <input 
        type="text" 
        value={searchQuery} 
        onChange={handleSearchChange} 
        placeholder="Search projects..." 
      />
      {/* Tag selection UI */}
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          {/* Display projects */}
          {projects.map(project => (
            <div key={project.id}>
              {/* Project card */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSearch;
