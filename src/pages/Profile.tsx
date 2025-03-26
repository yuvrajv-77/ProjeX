import { NumberTicker } from "@/components/magicui/number-ticker";
import { TextAnimate } from "@/components/magicui/text-animate";
import { TypingAnimation } from "@/components/magicui/typing-animation";

import { Button } from "@/components/ui/button";
import { Ellipsis, Mail, MousePointer2, UserRoundPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pointer } from "@/components/magicui/pointer";
import { motion } from "motion/react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ProjectCard } from "@/components/project/ProjectCard";
import { projectList } from "@/lib/projectList";
import { useAuth } from "@/context/authContext";

const Profile = () => {

   const { user, loading, session } = useAuth();

   const dev = user?.user_metadata?.name || "Developer";
   const devImg =
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";

   const bio = " Looking for experienced designer you are at the right place"

   return (
      <main className="  mx-auto md:px-30 px-5 bg-background relative">

         <div className="flex  border-green-400 flex-col-reverse  md:flex-row w-full  md:my-30 gap-10 md:gap-0">
            <section className="  md:w-1/2 flex flex-col items-center md:items-start justify-between gap-8 ">
               <span className="relative rounded-full">
                  <img
                     className="rounded-full size-20 object-cover"
                     src={devImg}
                     alt=""
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
                  <Button size={"lg"} className="rounded-full w-38 h-13">
                     <UserRoundPlus />
                     Follow
                  </Button>
                  <Button
                     size={"lg"}
                     variant={"outline"}
                     className=" w-38 h-13 rounded-full"
                  >
                     <Mail />
                     Message
                  </Button>
                  <Button size={"icon"} variant={"secondary"} className="rounded-full w-13 h-13"><Ellipsis /></Button>
               </div>
            </section>

            <section className=" md:w-1/2 flex md:justify-end">
               <div className="flex justify-end w-full md:w-3/4 h-68 md:h-[25rem] relative">
                  <img
                     className="object-cover w-full h-full  rounded-3xl"
                     src="https://assets.justinmind.com/wp-content/uploads/2019/09/nft-marketplace-cards-ui.png"
                     alt=""
                  />
               </div>
            </section>
            {/* <Pointer className="fill-blue-500"></Pointer> */}
         </div>

         {/* -----Projects---- */}

         <Separator className=" hidden md:block" />
         <div className=" h-full my-20 md:my-10">
            <Tabs defaultValue="projects" className=" md:mx-0 ">
               <TabsList className="grid mx-auto md:mx-0 grid-cols-2 w-[300px]">
                  <TabsTrigger value="projects">Showcases</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
               </TabsList>
               <TabsContent value="projects" className="">


                  <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-14 md:grid-cols-3 lg:gap-10 xl:max-h-[34rem] ">
                     {projectList.map((project) => (
                        <ProjectCard project={project} key={project.id} />
                     ))}
                  </ul>

               </TabsContent>
               <TabsContent value="about" className="">
                  About
               </TabsContent>
            </Tabs>
         </div>

      </main>
   );
};

export default Profile;
