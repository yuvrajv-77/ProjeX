import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ProjectTagsProps {
    tags: string[];
    updateTags: (tags: string[]) => void;
    errors?: { tags?: string };
}

const ProjectTags: React.FC<ProjectTagsProps> = ({ tags, updateTags, errors }) => {
    const [tagInput, setTagInput] = useState('');

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim().toLowerCase())) {
            updateTags([...tags, tagInput.trim().toLowerCase()]);
            setTagInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const removeTag = (indexToRemove: number) => {
        updateTags(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className=" mb-10">
            <h2 className="text-2xl font-semibold mb-5">Tags</h2>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 rounded-xl">
                    <input
                        placeholder="Add a tag (e.g., web design, mobile app)"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="w-full text-lg p-3 rounded-2xl font-medium focus:outline-none border"
                        onKeyDown={handleKeyDown}

                    />
                    <Button type="button" onClick={handleAddTag}>Add</Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 py-3 px-4 border-foreground border rounded-full"
                        >
                            {tag}
                            <X
                                size={20}
                                className="cursor-pointer"
                                onClick={() => removeTag(index)}
                            />
                        </div>
                    ))}
                </div>
                {errors?.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
            </div>
        </div>
    );
};

export default ProjectTags;
