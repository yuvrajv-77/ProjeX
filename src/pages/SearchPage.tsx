import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProjectSearch } from '@/hooks/useProjectSearch';
import { ProjectCard } from '@/components/project/ProjectCard';

const ProjectSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const { projects, loading } = useProjectSearch(searchTags);

  const handleSearch = () => {
    if (searchInput.trim()) {
      // Split input by commas or spaces to allow multiple tag search
      const newTags = searchInput.split(/[,\s]+/).map(tag => tag.trim().toLowerCase()).filter(Boolean);
      setSearchTags(newTags);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search by tags (e.g., web design, mobile app)"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSearch;
