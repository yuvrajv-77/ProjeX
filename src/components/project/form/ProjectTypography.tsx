import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import WebFont from 'webfontloader';

interface ProjectTypographyProps {
  fonts: string[];
  updateFonts: (fonts: string[]) => void;
}

export const ProjectTypography = ({
  fonts,
  updateFonts
}: ProjectTypographyProps) => {
  const [newFont, setNewFont] = useState<string>('');
  
  // Load fonts when component mounts or fonts change
  useEffect(() => {
    if (fonts.length > 0) {
      WebFont.load({
        google: {
          families: fonts
        }
      });
    }
  }, [fonts]);
  
  // Function to add a font
  const addFont = () => {
    if (newFont && !fonts.includes(newFont)) {
      const updatedFonts = [...fonts, newFont];
      updateFonts(updatedFonts);
      setNewFont('');
      
      // Load the new font
      WebFont.load({
        google: {
          families: [newFont]
        }
      });
    }
  };

  // Function to remove a font
  const removeFont = (index: number) => {
    const updatedFonts = [...fonts];
    updatedFonts.splice(index, 1);
    updateFonts(updatedFonts);
  };
  
  return (
    <div className='my-20'>
      <h1 className='text-3xl font-semibold mb-10'>Fonts Used</h1>

      <div className='flex items-center justify-between'>
        

        {/* Add new font */}
        <div className='flex gap-4 items-center'>
          <div className='flex-1 px-4 flex items-center border justify-center hover:ring-3 focus-within:outline-2 focus-within:outline-blue-400 rounded-xl hover:ring-purple-200'>
            <input
              type="text"
              value={newFont}
              onChange={(e) => setNewFont(e.target.value)}
              placeholder='Enter font name (e.g., Roboto, Open Sans)'
              className="w-full text-lg p-3 font-medium focus:outline-none"
            />
          </div>

          <Button
            onClick={addFont}
            disabled={!newFont.trim()}
            
            className='flex items-center gap-2'
          >
            <Plus size={18} /> Add Font
          </Button>
        </div>

        {/* Display existing fonts */}
        {fonts.length > 0 && (
          <div className='flex flex-wrap gap-3'>
            {fonts.map((font, index) => (
              <div key={index} className='relative bg-neutral-100 group px-4 py-2 rounded-lg  transition-all flex items-center gap-2'>
                <h3
                  className='text-2xl font-medium'
                  style={{ fontFamily: `'${font}', sans-serif` }}
                >
                  {font}
                </h3>
                <Button
                  variant="ghost"
                  size={'icon'}
                  className='rounded-full size-6 ml-1'
                  onClick={() => removeFont(index)}
                >
                  <Trash size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className='mt-2 text-sm text-gray-500'>Tips: Enter font names available on Google Fonts (e.g., Roboto, Lato, Open Sans, Montserrat)</p>

    </div>
  );
};
