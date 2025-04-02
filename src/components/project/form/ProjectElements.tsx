import { Button } from '@/components/ui/button';
import { Trash, Upload } from 'lucide-react';
import { ElementForm } from '@/types/projectFormTypes';
import { Input } from '@/components/ui/input';

interface ProjectElementsProps {
  elements: ElementForm[];
  updateElements: (elements: ElementForm[]) => void;
}

export const ProjectElements = ({
  elements,
  updateElements
}: ProjectElementsProps) => {
  
  // Function to handle element uploads
  const handleElementUpload = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const newElement: ElementForm = {
            imageUrl: e.target.result as string,
            elementText: '',
            file: file
          };
          updateElements([...elements, newElement]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to update element name
  const updateElementName = (index: number, name: string) => {
    const updatedElements = [...elements];
    updatedElements[index].elementText = name;
    updateElements(updatedElements);
  };

  // Function to remove an element
  const removeElement = (index: number) => {
    const newElements = [...elements];
    newElements.splice(index, 1);
    updateElements(newElements);
  };
  
  return (
    <div className='my-20'>
      <h1 className='text-3xl font-semibold'>Elements</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-x-8 md:gap-y-30 items-center mt-14 md:mt-10'>
        {/* Element previews */}
        {elements.map((element, index) => (
          <div key={index} className='flex flex-col gap-10 group relative'>
            <div className='w-full h-[20rem] md:h-[27rem] hover:brightness-90 transition-all duration-300'>
              <img
                src={element.imageUrl}
                className='rounded-xl w-full h-full object-cover'
                alt={element.elementText || "Element preview"}
              />
              <Input
                type="text" autoFocus
                placeholder='Enter Element Name'
                value={element.elementText}
                onChange={(e) => updateElementName(index, e.target.value)}
                className="w-full text-2xl mt-2 font-medium hover:ring-3 focus:outline-2 focus:outline-blue-400 rounded-md p-4 hover:ring-purple-200"
              />
              <Button
                variant="destructive"
                size={'icon'}
                className='rounded-full size-10 absolute top-2 right-2'
                onClick={() => removeElement(index)}
              >
                <Trash color='white' size={16} />
              </Button>
            </div>
          </div>
        ))}

        {/* Element image input box */}
        <label htmlFor="element-upload" className='group md:h-[27rem] border-2 border-neutral-300 border-dashed rounded-2xl cursor-pointer'>
          <div className='w-full h-full flex flex-col gap-10 justify-center items-center'>
            <img src='/src/assets/uploadimg.png' className='rounded-xl group-hover:scale-110 transition-all duration-200 size-20 object-cover' alt="" />
            <p className='text-lg flex items-center gap-2 text-neutral-600'><Upload />Add An Element</p>
            <input
              id="element-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleElementUpload(e.target.files[0]);
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
