import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FormErrors } from '@/types/projectFormTypes';
import { Github, Globe } from 'lucide-react';

interface ProjectBasicInfoProps {
  projectName: string;
  projectDescription: string;
  githubUrl: string;
  liveUrl: string;
  projectType: string;
  updateFormData: (field: string, value: any) => void;
  errors: FormErrors;
}

export const ProjectBasicInfo = ({
  projectName,
  projectDescription,
  githubUrl,
  liveUrl,
  projectType,
  updateFormData,
  errors
}: ProjectBasicInfoProps) => {
  return (
    <div className="space-y-10">
      <div>
        <input
          type="text"
          value={projectName}
          onChange={(e) => updateFormData('projectName', e.target.value)}
          placeholder='Your Project Name'
         className='w-full p-3 text-4xl font-semibold hover:ring-3 focus:outline-2 focus:outline-blue-400 text-center rounded-xl hover:ring-purple-200'
        />
        {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
      </div>
      
      <Textarea
        value={projectDescription}
        onChange={(e) => updateFormData('projectDescription', e.target.value)}
        placeholder='Write a description'
        className='mt-20 w-full p-3 text-2xl md:text-3xl text-center tracking-wide leading-tight font-light hover:ring-3 focus:outline-2 focus:outline-blue-400 rounded-xl hover:ring-purple-200'
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="github-url "><Github/>GitHub URL</Label>
          <Input
            id="github-url"
            type="url"
            className='mt-5 hover:ring-3 focus:outline-2 focus:outline-blue-400 text-center rounded-xl hover:ring-purple-200'
            value={githubUrl}
            onChange={(e) => updateFormData('githubUrl', e.target.value)}
            placeholder='https://github.com/username/repo'
          />
        </div>
        
        <div>
          <Label htmlFor="live-url"><Globe/>Live URL</Label>
          <Input
            id="live-url"
            type="url"
            value={liveUrl}
            className='mt-5 hover:ring-3 focus:outline-2 focus:outline-blue-400 text-center rounded-xl hover:ring-purple-200'
            onChange={(e) => updateFormData('liveUrl', e.target.value)}
            placeholder='https://your-project.com'
          />
        </div>
      </div>
      
      <div>
        <Label className='mb-5 text-lg font-bold'>Project Type</Label>
        <RadioGroup
          value={projectType}
          onValueChange={(value) => updateFormData('projectType', value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Development" id="development" />
            <Label htmlFor="development">Development</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Design" id="design" />
            <Label htmlFor="design">Design</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
