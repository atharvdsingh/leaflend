"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export function SmartBackButton() {
    const pathname = usePathname();
    const isRootRoom = pathname === "/room";

    return (
        <Button
            variant="ghost"
            asChild
            className="group flex items-center gap-2 hover:bg-white/10 text-white transition-all duration-300"
        >
            <Link href={isRootRoom ? "/" : "/room"}>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">
                    {isRootRoom ? "Back to Home" : "Back to Rooms"}
                </span>
            </Link>
        </Button>
    );
}
