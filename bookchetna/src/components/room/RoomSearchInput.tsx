"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface RoomSearchInputProps {
    userName: string;
}

export default function RoomSearchInput({ userName }: RoomSearchInputProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get("search") || "";
    const [searchTerm, setSearchTerm] = useState(currentSearch);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (debouncedSearchTerm) {
            params.set("search", debouncedSearchTerm);
        } else {
            params.delete("search");
        }

        // Only update if the URL actually needs changing to avoid looping
        const newSearchString = params.toString();
        const currentSearchString = searchParams.toString();

        if (newSearchString !== currentSearchString) {
            router.replace(`${pathname}?${newSearchString}`);
        }
    }, [debouncedSearchTerm, router, pathname, searchParams]);

    return (
        <div className="relative group w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-foreground/80 transition-colors" />
            <Input
                placeholder="Search rooms..."
                className="bg-card/40 border-border/50 pl-10 pr-[72px] h-11 focus:bg-card focus:ring-1 focus:ring-border transition-all text-sm rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-muted/50 rounded-lg border border-border/50 pointer-events-none">
                <span className="text-xs text-muted-foreground font-medium max-w-[60px] truncate block">
                    {userName}
                </span>
            </div>
        </div>
    );
}
