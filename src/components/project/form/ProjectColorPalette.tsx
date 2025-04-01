import { Button } from '@/components/ui/button';
import { Palette, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { TooltipProvider, TooltipTrigger, Tooltip, TooltipContent } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';

interface ProjectColorPaletteProps {
  colorPalette: string[];
  updateColorPalette: (colors: string[]) => void;
}

export const ProjectColorPalette = ({
  colorPalette,
  updateColorPalette
}: ProjectColorPaletteProps) => {
  const [newColor, setNewColor] = useState<string>('#000000');
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  
  // Function to add a new color to the palette
  const addColorToPalette = () => {
    if (newColor && !colorPalette.includes(newColor)) {
      updateColorPalette([...colorPalette, newColor]);
      setNewColor('#000000');
      setShowColorPicker(false);
    }
  };

  // Function to remove a color from the palette
  const removeColorFromPalette = (index: number) => {
    const updatedPalette = [...colorPalette];
    updatedPalette.splice(index, 1);
    updateColorPalette(updatedPalette);
  };
  
  return (
    <div className='my-20'>
      <h1 className='text-3xl font-semibold mb-10'>Color Palette</h1>

      <div className='flex flex-col gap-6'>
        {/* Display existing colors */}
        <div className='flex flex-wrap gap-4'>
          {colorPalette.map((color, index) => (
            <div key={index} className='relative group'>
              <div
                className='h-16 w-16 rounded-md border shadow-sm cursor-pointer flex items-center justify-center'
                style={{ backgroundColor: color }}
              >
                <span className='text-xs font-mono opacity-0 group-hover:opacity-100 bg-white/80 px-2 py-1 rounded'>
                  {color}
                </span>
              </div>
              <Button
                variant="destructive"
                size={'icon'}
                className='rounded-full size-6 absolute -top-2 -right-2 opacity-0 group-hover:opacity-100'
                onClick={() => removeColorFromPalette(index)}
              >
                <Trash color='white' size={12} />
              </Button>
            </div>
          ))}
        </div>

        {/* Add new color */}
        <div className='flex gap-4 items-center'>
          <div className='relative'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div 
                    className='p-3 rounded-xl flex border item-center justify-center' 
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  >
                    <Palette color='purple' />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Pick Color</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {showColorPicker && (
              <div className='absolute z-10 mt-2'>
                <div
                  className='fixed inset-0'
                  onClick={() => setShowColorPicker(false)}
                />
                <HexColorPicker
                  color={newColor}
                  onChange={setNewColor}
                />
              </div>
            )}
          </div>

          <div className='px-4 flex items-center border justify-center hover:ring-3 focus-within:outline-2 focus-within:outline-blue-400 rounded-md hover:ring-purple-200'>
            <Input
              type="text"
              value={newColor}
              onChange={(e) => {
                let value = e.target.value;
                if (value.charAt(0) !== '#' && value.length > 0) {
                  value = '#' + value;
                }
                setNewColor(value);
              }}
              placeholder='Enter Hex Value'
              className="w-full text-lg p-3 font-medium focus:outline-none"
            />
          </div>

          <Button
            onClick={addColorToPalette}
            disabled={!newColor.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)}
            className='flex items-center gap-2'
          >
            <Plus size={18} /> Add Color
          </Button>
        </div>
      </div>
    </div>
  );
};
