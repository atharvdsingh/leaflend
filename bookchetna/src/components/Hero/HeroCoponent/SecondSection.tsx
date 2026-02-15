import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import {
  BookOpen,
  DollarSign,
  Users,
  Shield,
  TrendingUp,
  Heart,
} from "lucide-react";

interface cardDataType {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const cardData:cardDataType[] = [
  {
    icon: BookOpen,
    title: "Vast Book Collection",
    description: "Browse thousands of books across all genres from our community of readers.",
  },
  {
    icon: DollarSign,
    title: "Earn Extra Income",
    description: "List your books and earn money by renting them to fellow book lovers.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a thriving community of readers sharing their personal libraries.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "All rentals are protected with our secure booking and rating system.",
  },
  {
    icon: TrendingUp,
    title: "Track Your Rentals",
    description: "Easily manage your rentals with return dates and overdue notifications.",
  },
  {
    icon: Heart,
    title: "Support Sustainability",
    description: "Reduce waste by sharing books instead of buying new ones.",
  },
];

function SecondSection() {
  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-900/10 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <Badge
            variant="outline"
            className="border-green-500/50 text-green-500 bg-green-500/10 backdrop-blur-sm px-4 py-1"
          >
            Why Choose BookRent?
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything You Need to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              Share and Discover Books
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you&apos;re looking to save money on books or earn extra income
            from your collection, we provide the tools to make it simple and secure.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {cardData.map((card, index) => {
            const CardIcon = card.icon;

            return (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-green-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/5 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CardIcon className="w-6 h-6 text-green-500" />
                  </div>
                  <CardContent className="p-0">
                    <h3 className="text-xl font-bold tracking-tight">{card.title}</h3>
                  </CardContent>
                </CardHeader>
                
                <CardFooter className="text-muted-foreground leading-relaxed">
                   {card.description}
                </CardFooter>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default SecondSection;
