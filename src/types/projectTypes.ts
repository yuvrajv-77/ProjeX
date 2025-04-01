import { ProjectMedia } from "./mediaTypes";

export type ProjectType = "Development" | "UI/UX Design";

export type TechStack = {
  name: string;
  icon: string;
};

export type DesignTool = {
  name: string;
  icon: string;
};

export type Highlight = {
  imageUrl: string;
  highlightText: string;
};
export type Element = {
  imageUrl: string;
  elementText: string;
};

export type Typography = {
  font_url: string;
  font_family: string;
};
export interface Project {
    id: string;
    user_id: string;
    title: string;
    description: string;
    github_url?: string;
    live_url?: string;
    project_type: string; // Example: ["Development", "UI/UX Design"]
    tech_stack?: TechStack[];
    design_tools?: DesignTool[];
    color_palette?: string[];
    typography?: Typography[];
    highlights?: Highlight[];
    likes: string[]; // Array of user IDs who liked the project
    created_at: string;
    slug: string;
    project_media: ProjectMedia[];
    elements?: Element[];
    users?: {
      name: string;
      avatar_url: string;
      email: string;
      github_url?: string;
      linkedin_url?: string;
      behance_url?: string;
      dribbble_url?: string;
    };
  };