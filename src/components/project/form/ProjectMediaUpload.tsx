import { Button } from '@/components/ui/button';
import { Trash, Upload } from 'lucide-react';
import { FormErrors } from '@/types/projectFormTypes';
import { useState } from 'react';

interface ProjectMediaUploadProps {
  files: File[];
  updateFiles: (files: File[]) => void;
  errors: FormErrors;
}

export const ProjectMediaUpload = ({
  files,
  updateFiles,
  errors
}: ProjectMediaUploadProps) => {
  const [previews, setPreviews] = useState<string[]>([]);
  
  // Function to handle file uploads and generate previews
  const handleFileUpload = (newFiles: File[]) => {
    updateFiles([...files, ...newFiles]);
    
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
  
  // Function to remove a file
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    updateFiles(newFiles);
    
    // Also remove the preview
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };
  
  return (
    <div className="mt-10">
      {/* Display selected files */}
      {files.length > 0 && (
        <div className="mt-6 space-y-10">
          {files.map((file, index) => (
            <div key={index} className="group hover:brightness-90 transition-all duration-200 ease-in-out relative rounded-xl">
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
      
      {errors.images && <p className="text-red-500 mt-1">{errors.images}</p>}
      
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
    </div>
  );
};
