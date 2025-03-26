import { v4 as uuidv4 } from 'uuid';

export interface Project {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  short_description: string;
  long_description: string;
  github_url: string | null;
  github_repo_url: string | null;
  site_url: string | null;
  behance_url: string | null;
  dribbble_url: string | null;
  project_type: 'development' | 'design' | 'hybrid';
  design_category: string | null;
  client_name: string | null;
  client_feedback: string | null;
  views: number;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  images: string[]; // Array of image URLs
  technologies?: string[]; // Technologies used in the project
}

// Sample user IDs
const userIds = [
  "a1b2c3d4-e5f6-4g7h-8i9j-0k1l2m3n4o5p",
  "b2c3d4e5-f6g7-5h6i-9j0k-1l2m3n4o5p6q",
  "c3d4e5f6-g7h8-6i7j-0k1l-2m3n4o5p6q7r"
];

export const projects: Project[] = [
  {
    id: uuidv4(),
    user_id: userIds[0],
    title: "ProjeX - Project Showcase Platform",
    slug: "projex-project-showcase-platform",
    short_description: "A platform for developers and designers to showcase their projects",
    long_description: "ProjeX is a comprehensive platform designed for developers and designers to showcase their work, get feedback, and connect with potential clients. The platform features a clean, modern UI with advanced filtering and sorting capabilities.",
    github_url: "https://github.com/yuvrajv-77/ProjeX",
    github_repo_url: "https://github.com/yuvrajv-77/ProjeX.git",
    site_url: "https://projex.dev",
    behance_url: null,
    dribbble_url: null,
    project_type: "development",
    design_category: null,
    client_name: null,
    client_feedback: null,
    views: 3452,
    featured: true,
    status: "published",
    created_at: "2023-12-15T10:30:00Z",
    updated_at: "2024-03-20T14:45:00Z",
    images: [
      "https://assets.awwwards.com/awards/submissions/2025/02/67b3982a0e2cd790464326.png",
      "https://assets.awwwards.com/awards/element/2025/03/67c5959098247918112280.jpg",
      "https://assets.awwwards.com/awards/element/2024/05/65c5959098247918112280.jpg"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next JS"]
  },
  {
    id: uuidv4(),
    user_id: userIds[1],
    title: "Eco Tracker - Carbon Footprint App",
    slug: "eco-tracker-carbon-footprint-app",
    short_description: "Mobile application to track and reduce personal carbon footprint",
    long_description: "Eco Tracker helps users monitor their daily activities and calculates their carbon footprint. It provides personalized recommendations to reduce environmental impact and allows users to set goals and track progress over time.",
    github_url: "https://github.com/designerName/eco-tracker",
    github_repo_url: "https://github.com/designerName/eco-tracker.git",
    site_url: "https://ecotracker.app",
    behance_url: null,
    dribbble_url: null,
    project_type: "development",
    design_category: null,
    client_name: "GreenEarth Foundation",
    client_feedback: "The app exceeded our expectations. User engagement has increased by 45% since launch.",
    views: 2187,
    featured: true,
    status: "published",
    created_at: "2023-10-05T08:15:00Z",
    updated_at: "2024-02-18T11:20:00Z",
    images: [
      "https://assets.awwwards.com/awards/element/2025/03/67c5959098247918112280.jpg",
      "https://assets.awwwards.com/awards/submissions/2024/11/65b3982a0e2cd790464326.png",
      "https://assets.awwwards.com/awards/element/2024/06/65c5959098247918112280.jpg"
    ],
    technologies: ["React Native", "TypeScript", "Node.js", "MongoDB"]
  },
  {
    id: uuidv4(),
    user_id: userIds[2],
    title: "Luminous - Brand Identity Design",
    slug: "luminous-brand-identity-design",
    short_description: "Complete brand identity for a luxury skincare line",
    long_description: "Developed a comprehensive brand identity for Luminous, a premium skincare brand. The project included logo design, packaging, typography, color palette, and brand guidelines that reflect the brand's commitment to natural ingredients and sustainable practices.",
    github_url: null,
    github_repo_url: null,
    site_url: null,
    behance_url: "https://behance.net/gallery/luminous-brand",
    dribbble_url: "https://dribbble.com/shots/luminous-identity",
    project_type: "design",
    design_category: "graphic",
    client_name: "Luminous Skincare",
    client_feedback: "The design perfectly captures our brand essence. Sales increased by 30% after rebranding.",
    views: 5621,
    featured: true,
    status: "published",
    created_at: "2023-09-12T14:20:00Z",
    updated_at: "2024-01-05T09:30:00Z",
    images: [
      "https://assets.awwwards.com/awards/element/2024/05/67c5959098247918112280.jpg",
      "https://assets.awwwards.com/awards/element/2024/07/65c5959098247918112280.jpg",
      "https://assets.awwwards.com/awards/element/2024/08/66c5959098247918112280.jpg"
    ],
    technologies: ["Figma", "Adobe Illustrator", "Adobe Photoshop"]
  },
  {
    id: uuidv4(),
    user_id: userIds[0],
    title: "FinTrack - Personal Finance Dashboard",
    slug: "fintrack-personal-finance-dashboard",
    short_description: "Interactive dashboard for personal finance management",
    long_description: "FinTrack is a comprehensive financial management tool that helps users track expenses, set budgets, and visualize spending patterns. The dashboard features interactive charts, expense categorization, and financial goal setting capabilities.",
    github_url: "https://github.com/developer/fintrack",
    github_repo_url: "https://github.com/developer/fintrack.git",
    site_url: "https://fintrack.io",
    behance_url: null,
    dribbble_url: null,
    project_type: "development",
    design_category: null,
    client_name: null,
    client_feedback: null,
    views: 1876,
    featured: false,
    status: "published",
    created_at: "2023-11-20T16:45:00Z",
    updated_at: "2024-03-10T13:25:00Z",
    images: [
      "https://assets.awwwards.com/awards/submissions/2024/12/65a3982a0e2cd790464326.png",
      "https://assets.awwwards.com/awards/element/2024/09/65c5959098247918112280.jpg"
    ],
    technologies: ["Vue.js", "D3.js", "Firebase", "Tailwind CSS"]
  },
  {
    id: uuidv4(),
    user_id: userIds[1],
    title: "Urban Oasis - Architectural Visualization",
    slug: "urban-oasis-architectural-visualization",
    short_description: "3D visualization for a sustainable urban housing project",
    long_description: "Created photorealistic 3D renderings and animations for Urban Oasis, a sustainable housing development in downtown Seattle. The visualizations highlight the project's green spaces, energy-efficient features, and community-focused design.",
    github_url: null,
    github_repo_url: null,
    site_url: null,
    behance_url: "https://behance.net/gallery/urban-oasis",
    dribbble_url: "https://dribbble.com/shots/urban-oasis-visualization",
    project_type: "design",
    design_category: "3D",
    client_name: "EcoHomes Development",
    client_feedback: "The visualizations were instrumental in securing project funding. Investors were impressed by the attention to detail.",
    views: 4328,
    featured: true,
    status: "published",
    created_at: "2023-08-05T11:30:00Z",
    updated_at: "2024-02-28T15:40:00Z",
    images: [
      "https://assets.awwwards.com/awards/element/2024/06/67c5959098247918112280.jpg",
      "https://assets.awwwards.com/awards/element/2024/10/65c5959098247918112280.jpg",
      "https://assets.awwwards.com/awards/element/2024/11/66c5959098247918112280.jpg"
    ],
    technologies: ["Blender", "3ds Max", "V-Ray", "Adobe After Effects"]
  },
  {
    id: uuidv4(),
    user_id: userIds[2],
    title: "MediConnect - Healthcare Platform",
    slug: "mediconnect-healthcare-platform",
    short_description: "Telemedicine platform connecting patients with healthcare providers",
    long_description: "MediConnect is a comprehensive telemedicine solution that facilitates virtual consultations, secure messaging, and electronic health records management. The platform prioritizes accessibility, security, and ease of use for both patients and healthcare providers.",
    github_url: "https://github.com/devteam/mediconnect",
    github_repo_url: "https://github.com/devteam/mediconnect.git",
    site_url: "https://mediconnect.health",
    behance_url: null,
    dribbble_url: null,
    project_type: "development",
    design_category: null,
    client_name: "Regional Health Network",
    client_feedback: "The platform has transformed our patient care capabilities. User satisfaction rates are consistently above 90%.",
    views: 3105,
    featured: true,
    status: "published",
    created_at: "2023-07-18T09:20:00Z",
    updated_at: "2024-01-15T12:10:00Z",
    images: [
      "https://cdn.dribbble.com/userupload/17118103/file/original-87c2f32330516e185df3dd8e8462ef18.png?resize=1024x768&vertical=center",
      "https://cdn.dribbble.com/userupload/17118103/file/original-87c2f32330516e185df3dd8e8462ef18.png?resize=1024x768&vertical=centerpan pacific"
    ],
    technologies: ["Angular", "Node.js", "MongoDB", "Socket.io"]
  },
  {
    id: uuidv4(),
    user_id: userIds[0],
    title: "Wanderlust - Travel App UI Design",
    slug: "wanderlust-travel-app-ui-design",
    short_description: "Modern UI/UX design for a travel planning application",
    long_description: "Designed a complete user interface for Wanderlust, a travel planning application. The design focuses on intuitive navigation, visually appealing layouts, and seamless user flows for trip planning, booking, and itinerary management.",
    github_url: null,
    github_repo_url: null,
    site_url: null,
    behance_url: "https://behance.net/gallery/wanderlust-ui",
    dribbble_url: "https://dribbble.com/shots/wanderlust-travel-app",
    project_type: "design",
    design_category: "UI/UX",
    client_name: "TravelTech Innovations",
    client_feedback: "The design perfectly balances aesthetics and functionality. Our users love the intuitive interface.",
    views: 6742,
    featured: true,
    status: "published",
    created_at: "2023-06-25T13:40:00Z",
    updated_at: "2024-02-10T10:15:00Z",
    images: [
      "https://assets.awwwards.com/awards/element/2024/07/67c5959098247918112280.jpg",
      "https://assets.awwwards.com/awards/element/2024/08/65c5959098247918112280.jpg",
      "https://assets.awwwards.com/awards/element/2024/09/66c5959098247918112280.jpg"
    ],
    technologies: ["Figma", "Adobe XD", "Principle"]
  },
  {
    id: uuidv4(),
    user_id: userIds[1],
    title: "CodeMentor - Programming Learning Platform",
    slug: "codementor-programming-learning-platform",
    short_description: "Interactive platform for learning programming languages",
    long_description: "CodeMentor is an educational platform featuring interactive coding exercises, video tutorials, and real-time feedback for learners. The platform supports multiple programming languages and adapts to different skill levels, from beginners to advanced programmers.",
    github_url: "https://github.com/edutech/codementor",
    github_repo_url: "https://github.com/edutech/codementor.git",
    site_url: "https://codementor.edu",
    behance_url: null,
    dribbble_url: null,
    project_type: "development",
    design_category: null,
    client_name: "EduTech Solutions",
    client_feedback: "Student engagement has increased dramatically. The interactive approach has proven highly effective.",
    views: 2954,
    featured: false,
    status: "published",
    created_at: "2023-05-10T15:30:00Z",
    updated_at: "2024-03-05T11:45:00Z",
    images: [
      "https://assets.awwwards.com/awards/submissions/2024/09/67b3982a0e2cd790464326.png",
      "https://assets.awwwards.com/awards/element/2024/10/65c5959098247918112280.jpg"
    ],
    technologies: ["React", "Express.js", "PostgreSQL", "WebSockets"]
  },
]