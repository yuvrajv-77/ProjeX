import { Button } from '@/components/ui/button';
import { Trash, Upload } from 'lucide-react';
import { HighlightForm } from '@/types/projectFormTypes';
import { Textarea } from '@/components/ui/textarea';

interface ProjectHighlightsProps {
  highlights: HighlightForm[];
  updateHighlights: (highlights: HighlightForm[]) => void;
}

export const ProjectHighlights = ({
  highlights,
  updateHighlights
}: ProjectHighlightsProps) => {
  
  // Function to handle highlight uploads
  const handleHighlightUpload = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const newHighlight: HighlightForm = {
            imageUrl: e.target.result as string,
            highlightText: '',
            file: file
          };
          updateHighlights([...highlights, newHighlight]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to update highlight description
  const updateHighlightDescription = (index: number, description: string) => {
    const updatedHighlights = [...highlights];
    updatedHighlights[index].highlightText = description;
    updateHighlights(updatedHighlights);
  };

  // Function to remove a highlight
  const removeHighlight = (index: number) => {
    const newHighlights = [...highlights];
    newHighlights.splice(index, 1);
    updateHighlights(newHighlights);
  };
  
  return (
    <div className='my-20'>
      <h1 className='text-3xl font-semibold'>Highlights</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-x-8 md:gap-y-30 items-center mt-14 md:mt-20'>
        {/* Highlight previews */}
        {highlights.map((highlight, index) => (
          <div key={index} className='flex flex-col gap-10 group relative'>
            <div className='w-full h-[20rem] md:h-[32rem] hover:brightness-90 transition-all duration-300'>
              <img
                src={highlight.imageUrl}
                className='rounded-xl w-full h-full object-cover'
                alt={highlight.highlightText || "Highlight preview"}
              />
              <Textarea
                placeholder='Enter Highlight Description'
                value={highlight.highlightText}
                onChange={(e) => updateHighlightDescription(index, e.target.value)}
                className="w-full text-lg mt-2 font-medium hover:ring-3 focus:outline-2 focus:outline-blue-400 rounded-md p-4 hover:ring-purple-200 min-h-[100px] resize-y"
              />
              <Button
                variant="destructive"
                size={'icon'}
                className='rounded-full size-10 absolute top-2 right-2'
                onClick={() => removeHighlight(index)}
              >
                <Trash color='white' size={16} />
              </Button>
            </div>
          </div>
        ))}

        {/* Highlight image input box */}
        <label htmlFor="highlight-upload" className='group md:h-[32rem] border-2 border-neutral-300 border-dashed rounded-2xl cursor-pointer'>
          <div className='w-full h-full flex flex-col gap-10 justify-center items-center'>
            <img src='/src/assets/uploadimg.png' className='rounded-xl group-hover:scale-110 transition-all duration-200 size-20 object-cover' alt="" />
            <p className='text-lg flex items-center gap-2 text-neutral-600'><Upload />Add A Highlight</p>
            <input
              id="highlight-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleHighlightUpload(e.target.files[0]);
                  // Reset the input value so the same file can be selected again
                  e.target.value = '';
                }
              }}
            />
          </div>
        </label>
      </div>
    </div>
  );
};
