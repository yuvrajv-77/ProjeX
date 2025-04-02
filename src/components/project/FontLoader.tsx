import React, { useEffect } from 'react';
import WebFont from 'webfontloader';

interface FontLoaderProps {
  fontFamily: string;
}

const FontLoader: React.FC<FontLoaderProps> = ({ fontFamily }) => {
  useEffect(() => {
    if (!fontFamily) return;
    
    try {
      WebFont.load({
        google: {
          families: [`${fontFamily}:300,400,500,700`]
        },
        active: () => {
          console.log(`Font ${fontFamily} loaded successfully`);
        },
        inactive: () => {
          console.warn(`Failed to load font ${fontFamily}`);
        }
      });
    } catch (error) {
      console.error('Error loading font:', error);
    }
  }, [fontFamily]);
  
  return null;
};

export default FontLoader;
