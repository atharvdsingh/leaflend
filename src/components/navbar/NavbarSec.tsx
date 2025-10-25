"use client"
import React from "react";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "@radix-ui/react-separator";
import { usePathname } from "next/navigation";

interface Props {}

function NavbarSec(props: Props) {
    const path=usePathname()
    console.log(path)


  const {} = props;
  interface linksType {
    href: String;
    label: String;
    name: String;
  }
  const link: linksType[] = [
    {
      name: "Browse Books",
      href: "/home",
      label: "/home",
    },
    {
      name: "My Books",
      href: "/my-books",
      label: "/my-books",
    },
    {
      name: "My Rentals",
      href: "/my-rental",
      label: "/my-rental",
    },
    {
      name: "Cart",
      href: "/cart",
      label: "/cart",
    },
  ];

  return (
    <>
      <ButtonGroup>
        {
            link.map((link,index)=> (
                
                <Button className={`${path ===link.label ?("text-black"):("text-gray-500") }`} asChild key={index} >
                    <Link href={`${link.href}`} >
                       {link.name}
                    </Link>
                    </Button>
            )  )
        }
      
      </ButtonGroup>
    </>
  );
}

export default NavbarSec;
