"use client";
import React from "react";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
export default function SetTheme() {
  const { setTheme, theme } = useTheme();
    const handleChangeTheme = ()=>{
        theme =="light"? (setTheme("dark")):(setTheme("light"))

    }
  return (
    <>
    
        <Tooltip  >
    <TooltipTrigger asChild >

      <Button onClick={handleChangeTheme} variant="outline" size="icon">
    
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      
      </Button>
    </TooltipTrigger>
    <TooltipContent>
        change to {theme}
    </TooltipContent>
        </Tooltip>
    </>
  );
}
