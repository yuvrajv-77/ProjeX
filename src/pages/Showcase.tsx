import { NumberTicker } from "@/components/magicui/number-ticker";
import { TextAnimate } from "@/components/magicui/text-animate";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Mail, MousePointer2, UserRoundPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pointer } from "@/components/magicui/pointer";
import { motion } from "motion/react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { BorderBeam } from "@/components/magicui/border-beam";

const Showcase = () => {
  const dev = "James Tangi";
  const devImg =
    "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
  return (
    <main className=" h-screen mx-auto md:px-30 px-5 bg-background relative">
      <div className="fixed bottom-10 right-10 ">
        <ModeToggle />
      </div>

      <div className="flex borde border-green-400 flex-col-reverse  md:flex-row w-full my-13 md:my-30 gap-18 md:gap-0">
        <section className="  md:w-1/2 flex flex-col items-center md:items-start justify-between gap-5 ">
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
            Looking for experienced designer you are at the right place
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
              <p> likes</p>
            </span>
          </div>

          <div className="flex gap-2">
            <Button size={"lg"} className="rounded-full w-38 h-13">
              {" "}
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
        <Pointer className="fill-blue-500"></Pointer>
      </div>

      {/* -----Projects---- */}
      <div className="borde border-green-500">
        <div className="borde border-red-500">
          <Tabs defaultValue="projects" className=" md:mx-0 ">
            <TabsList className="grid mx-auto md:mx-0 grid-cols-2 w-[300px]">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <Separator className="my-4" />
            <TabsContent value="projects" className="">
              Projects array
            </TabsContent>
            <TabsContent value="about" className="">
              About
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default Showcase;
