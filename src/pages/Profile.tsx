import { NumberTicker } from "@/components/magicui/number-ticker";
import { TextAnimate } from "@/components/magicui/text-animate";
import { TypingAnimation } from "@/components/magicui/typing-animation";

import { Button } from "@/components/ui/button";
import { Ellipsis, Loader2, Mail, MousePointer2, UserRoundPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ProjectCard } from "@/components/project/ProjectCard";
import { projectList } from "@/lib/projectList";
import { useAuth } from "@/context/authContext";
import { useProjects } from "@/hooks/useProject";
import { Project } from "@/types/projectTypes";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";

// Define a type for the profile user  
interface ProfileUser {
   id: string;
   name: string;
   avatar_url: string;
   bio: string;
   username: string;
   linkedin_url?: string;
   github_url?: string;
   behance_url?: string;
   dribble_url?: string;
   email?: string;
}

const Profile = () => {
   const { userId } = useParams<{ userId: string }>();
   const navigate = useNavigate();
   const { user, loading: authLoading } = useAuth();
   const { data: allProjects, isLoading: projectsLoading } = useProjects();

   const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
   const [userProjects, setUserProjects] = useState<Project[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isCurrentUser, setIsCurrentUser] = useState(false);

   // Fetch the profile user data
   useEffect(() => {
      const fetchProfileUser = async () => {
         setIsLoading(true);

         try {
            if (!userId) {
               // If no userId provided, redirect to current user's profile
               if (user) {
                  navigate(`/profile/${user.id}`);
                  return;
               }
            } else {
               // Fetch user by ID
               const { data, error } = await supabase
                  .from('users')
                  .select('*')
                  .eq('id', userId)
                  .single();

               if (error) {
                  console.error('Error fetching user:', error);
                  return;
               }

               if (data) {
                  setProfileUser(data);
                  // Check if this is the current logged-in user
                  setIsCurrentUser(user?.id === data.id);
               }
            }
         } catch (error) {
            console.error('Error:', error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchProfileUser();
   }, [userId, user, navigate]);

   // Filter projects for the profile user
   useEffect(() => {
      if (allProjects && profileUser) {
         const filteredProjects = allProjects.filter(
            (project) => project.user_id === profileUser.id
         );
         setUserProjects(filteredProjects);
      }
   }, [allProjects, profileUser]);

   if (isLoading || authLoading) {
      return (
         <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Loading profile...</p>
         </div>
      );
   }

   if (!profileUser) {
      return (
         <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">User not found</h1>
            <p className="mt-2">The user you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-4" onClick={() => navigate('/')}>
               Go Home
            </Button>
         </div>
      );
   }

   const dev = profileUser.name || "Developer";
   const devImg = profileUser.avatar_url ||
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
   const bio = profileUser.bio || "Looking for experienced designer you are at the right place";

   return (
      <main className="mx-auto md:px-30 px-5 bg-background relative">
         <div className="flex border-green-400 flex-col-reverse md:flex-row w-full md:my-30 gap-10 md:gap-0">
            <section className="md:w-1/2 flex flex-col items-center md:items-start justify-between gap-8">
               <span className="relative rounded-full">
                  <img
                     className="rounded-full size-20 object-cover"
                     src={devImg}
                     alt={`${dev}'s profile`}
                  />
                  <BorderBeam duration={6} size={100} />
               </span>
               <TypingAnimation className="text-2xl md:text-4xl" duration={30}>
                  {dev}
               </TypingAnimation>
               <TextAnimate
                  className="font-semibold text-3xl md:text-6xl text-center md:text-start"
                  animation="blurInUp"
                  by="word"
                  once
               >
                  {bio}
               </TextAnimate>
               <div className="flex gap-5 text-gray-500">
                  <span className="inline-flex items-center gap-1 ">
                     <NumberTicker
                        value={243}
                        className="whitespace-pre-wrap text- font-medium tracking-tighter text-black dark:text-white"
                     />
                     <p> followers</p>
                  </span>
                  <span className="inline-flex items-center gap-1">
                     <NumberTicker
                        value={137}
                        className="whitespace-pre-wrap text- font-medium tracking-tighter text-black dark:text-white"
                     />
                     <p> following</p>
                  </span>
                  <span className="inline-flex items-center gap-1">
                     <NumberTicker
                        value={1021}
                        className="whitespace-pre-wrap text- font-medium tracking-tighter text-black dark:text-white"
                     />
                     <p> appreciations</p>
                  </span>
               </div>

               <div className="flex gap-5">
                  {!isCurrentUser && (
                     <>
                        <Button size={"lg"} className="rounded-full w-38 h-13">
                           <UserRoundPlus />
                           Follow
                        </Button>
                        <Button
                           size={"lg"}
                           variant={"outline"}
                           className="w-38 h-13 rounded-full"
                        >
                           <Mail />
                           Message
                        </Button>
                     </>
                  )}
                  {isCurrentUser && (
                     <Button
                        size={"lg"}
                        variant={"outline"}
                        className="rounded-full w-38 h-13"
                        onClick={() => navigate('/edit-profile')}
                     >
                        Edit Profile
                     </Button>
                  )}
                  <Button size={"icon"} variant={"secondary"} className="rounded-full w-13 h-13"><Ellipsis /></Button>
               </div>

               {/* Social links */}
               {(profileUser.linkedin_url || profileUser.github_url || profileUser.behance_url || profileUser.dribble_url) && (
                  <div className="flex gap-4 mt-2">
                     {profileUser.linkedin_url && (
                        <a href={profileUser.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                           LinkedIn
                        </a>
                     )}
                     {profileUser.github_url && (
                        <a href={profileUser.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
                           GitHub
                        </a>
                     )}
                     {profileUser.behance_url && (
                        <a href={profileUser.behance_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                           Behance
                        </a>
                     )}
                     {profileUser.dribble_url && (
                        <a href={profileUser.dribble_url} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                           Dribbble
                        </a>
                     )}
                  </div>
               )}
            </section>

            <section className="md:w-1/2 flex md:justify-end">
               <div className="flex justify-end w-full md:w-3/4 h-68 md:h-[25rem] relative">
                  <img
                     className="object-cover w-full h-full rounded-3xl"
                     src="https://assets.justinmind.com/wp-content/uploads/2019/09/nft-marketplace-cards-ui.png"
                     alt="Profile showcase"
                  />
               </div>
            </section>
         </div>

         {/* -----Projects---- */}
         <Separator className="hidden md:block" />
         <div className="h-full my-20 md:my-10">
            <Tabs defaultValue="projects" className="md:mx-0">
               <TabsList className="grid mx-auto md:mx-0 grid-cols-2 w-[300px]">
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
               </TabsList>
               <TabsContent value="projects" className="">
                  {projectsLoading ? (
                     <div className="flex justify-center items-center h-40">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="ml-2">Loading projects...</p>
                     </div>
                  ) : userProjects.length > 0 ? (
                     <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-14 md:grid-cols-3 lg:gap-10 xl:max-h-[34rem]">
                        {userProjects.map((project) => (
                           <ProjectCard project={project} key={project.id} />
                        ))}
                     </ul>
                  ) : (
                     <div className="flex flex-col items-center justify-center h-40 gap-4">
                        <p>No projects found</p>
                        {isCurrentUser && (
                           <Button variant="outline" asChild>
                              <a href="/create-project">Create your first project</a>
                           </Button>
                        )}
                     </div>
                  )}
               </TabsContent>
               <TabsContent value="about" className="p-4">
                  <div className="space-y-4">
                     <h2 className="text-2xl font-bold">About {profileUser.name}</h2>
                     <p>{profileUser.bio}</p>

                     {/* You can add more detailed about information here */}
                     {profileUser.email && (
                        <div>
                           <h3 className="text-lg font-semibold mt-4">Contact</h3>
                           <p className="text-gray-600 dark:text-gray-300">{profileUser.email}</p>
                        </div>
                     )}
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      </main>
   );
};

export default Profile;
