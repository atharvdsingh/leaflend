import React from 'react';

// --- Icon Imports ---
// Assumes `lucide-react` is installed (`npm install lucide-react`)
import { BookOpen, ShoppingCart } from 'lucide-react';

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
 * BookRentalCard
 * A component displaying a book/item for rent, built with shadcn/ui.
 * It's designed to match a dark, modern aesthetic.
 * c
 */

interface Props{
    title:String,
    author:String,
    genre:String,
    price:string,
    imageURL:string,
    available:Boolean
}

export default function HomeCard(props:Props) {
    const {imageURL,title,available,author,genre,price}=props

  return (
    <Card className="max-w-xs w-full rounded-2xl bg-black border-zinc-800 text-white  overflow-hidden shadow-2xl">
      {/* Image container */}
      <div className="relative">
        <img
          src={imageURL}
          alt={`Cover image of ${title}`}
          className="w-full h-64 object-cover" // Fixed height for uniform card sizes
        />
        
        {/* Available Badge, positioned absolutely */}
        {available && (
          <Badge
            variant="secondary"
            className="absolute  top-3 right-3 bg-white text-black hover:bg-white font-medium px-3 py-1"
          >
            Available
          </Badge>
        )}
      </div>

      {/* Header: Contains Title and Author */}
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-semibold text-white">
          {title}
        </CardTitle>
        <CardDescription className="text-zinc-500 pt-1">
          {author}
        </CardDescription>
      </CardHeader>

      {/* Content: Contains Genre and Price */}
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <span className="text-zinc-500 text-sm">{genre}</span>
          <span className="text-green-400 font-bold text-lg">
            {price}
          </span>
        </div>
      </CardContent>

      {/* Footer: Contains the action buttons */}
      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="text-white border-zinc-700 hover:bg-zinc-800 hover:text-white"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Details
        </Button>
        
        <Button className="bg-white text-black hover:bg-zinc-200 font-semibold">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Rent
        </Button>
      </CardFooter>
    </Card>
  );
}
