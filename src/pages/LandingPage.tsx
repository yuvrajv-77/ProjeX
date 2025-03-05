import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Mail, UserRoundPlus } from "lucide-react";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <main className="h-screen mx-20 flex items-center justify-center">
        <div className="mx-auto border flex items-center flex-col w-[450px] gap-10">
          <h1 className="text-5xl font-bold text-center">
            UI library for <br />
            Design Engineers
          </h1>

          <p className="text-center text-lg">
            150+ free and open-source animated components and effects built with
            React, Typescript, Tailwind CSS, and Motion. Perfect companion for
            shadcn/ui.
          </p>

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
        </div>
      </main>
    </>
  );
};

export default LandingPage;
