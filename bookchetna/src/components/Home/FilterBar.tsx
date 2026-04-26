"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";

interface FilterBarProps {
    roomId: number;
}

const CATEGORIES = [
    { value: "All", label: "All Genres" },
    { value: "Fiction", label: "Fiction" },
    { value: "Classic", label: "Classic" },
    { value: "Contemporary", label: "Contemporary" },
    { value: "Mystery", label: "Mystery" },
    { value: "Sci_Fi", label: "Sci-Fi" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Non_Fiction", label: "Non-Fiction" },
];

export default function FilterBar({ roomId }: FilterBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get("search") || "";
    const currentCategory = searchParams.get("category") || "All";

    const [searchTerm, setSearchTerm] = useState(currentSearch);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

    const handleCategoryChange = (val: string) => {
        updateQueryParams(debouncedSearchTerm, val === "All" ? "" : val);
    };

    useEffect(() => {
        updateQueryParams(debouncedSearchTerm, currentCategory === "All" ? "" : currentCategory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm]);

    const updateQueryParams = (search: string, cat: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1"); // Reset to page 1 on new filter

        if (search) {
            params.set("search", search);
        } else {
            params.delete("search");
        }

        if (cat && cat !== "All") {
            params.set("category", cat);
        } else {
            params.delete("category");
        }

        router.push(`/home?${params.toString()}`);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-4 w-full max-w-4xl mx-auto px-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by book name or author..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="w-full sm:w-[200px]">
                <Select
                    value={currentCategory === "" ? "All" : currentCategory}
                    onValueChange={handleCategoryChange}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
