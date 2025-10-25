import React from "react";

// --- Icon Imports ---
// Assumes `lucide-react` is installed (`npm install lucide-react`)
import { BookOpen, ShoppingCart } from "lucide-react";

// --- Shadcn UI Component Imports ---
// These components are assumed to be in your project, added via:
// `npx shadcn-ui@latest add card`
// `npx shadcn-ui@latest add button`
// `npx shadcn-ui@latest add badge`
// The path `@/components/ui` is the default for Next.js.
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * HomeCard
 * A component displaying a book/item for rent, built with shadcn/ui.
 * It's designed to match a dark, modern aesthetic.
 */

interface Props {
  title: string; // Changed from String
  author: string; // Changed from String
  genre: string; // Changed from String
  price: string;
  imageURL: string; // User changed from imageUrl
  available: Boolean;
}

export default function HomeCard(props: Props) {
  const { imageURL, title, available, author, genre, price } = props;

  // Kept max-w-64 (256px)
  return (
    <Card className="max-w-64 w-full rounded-2xl bg-black border-zinc-800 text-white overflow-hidden shadow-2xl">
      {/* Image container */}
      <div className="relative">
        <img
          src={imageURL}
          alt={`Cover image of ${title}`}
          // Changed to h-40 (160px)
          className="w-full h-40 object-cover"
        />

        {/* Available Badge, positioned absolutely */}
        {available && (
          <Badge
            variant="default" // Kept user's variant
            // Reduced padding
            className="absolute top-2 right-2 bg-white text-black hover:bg-white font-medium px-1.5 py-0.5 text-xs"
          >
            Available
          </Badge>
        )}
      </div>

      {/* Header: Contains Title and Author - Reduced padding */}
      <CardHeader className="p-2">
        {/* Reduced text size and added truncate */}
        <CardTitle className="text-base font-semibold text-white truncate">
          {title}
        </CardTitle>
        {/* Reduced text size */}
        <CardDescription className="text-zinc-500 text-xs pt-0.5">
          {author}
        </CardDescription>
      </CardHeader>

      {/* Content: Contains Genre and Price - Reduced padding */}
      <CardContent className="p-2 pt-0">
        <div className="flex justify-between items-center">
          <span className="text-zinc-500 text-sm">{genre}</span>
          {/* Reduced text size */}
          <span className="text-green-400 font-bold text-sm">{price}</span>
        </div>
      </CardContent>

      {/* Footer: Contains the action buttons - Reduced padding and gap */}
      <CardFooter className="p-2 pt-0 grid grid-cols-2 gap-1.5">
        {/* Made buttons smaller */}
        <Button
          variant="outline"
          className="text-white border-zinc-700 hover:bg-zinc-800 hover:text-white h-8 px-3 text-xs"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Details
        </Button>

        <Button className="bg-white text-black hover:bg-zinc-200 font-semibold h-8 px-3 text-xs">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Rent
        </Button>
      </CardFooter>
    </Card>
  );
}
