import { TechStack } from './projectTypes';

export interface ElementForm {
  imageUrl: string;
  elementText: string;
  file: File;
}

export interface HighlightForm {
  imageUrl: string;
  highlightText: string;
  file: File;
}

export interface ProjectFormData {
  projectName: string;
  projectDescription: string;
  projectType: string;
  githubUrl: string;
  liveUrl: string;
  files: File[];
  elements: ElementForm[];
  highlights: HighlightForm[];
  colorPalette: string[];
  selectedTools: TechStack[];
  fonts: string[];
  tags: string[];
}

export interface FormErrors {
  name?: string;
  images?: string;
}
