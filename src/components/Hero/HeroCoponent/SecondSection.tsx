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

interface Props {}
interface cardDataType {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const cardData:{icon:any,title:string,description:string}[] = [
  {
    icon: BookOpen,
    title: "Vast Book Collection",
    description:
      "Browse thousands of books across all genres from our community of readers.",
  },
  {
    icon: DollarSign,
    title: "Earn Extra Income",
    description:
      "List your books and earn money by renting them to fellow book lovers.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Join a thriving community of readers sharing their personal libraries.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description:
      "All rentals are protected with our secure booking and rating system.",
  },
  {
    icon: TrendingUp,
    title: "Track Your Rentals",
    description:
      "Easily manage your rentals with return dates and overdue notifications.",
  },
  {
    icon: Heart,
    title: "Support Sustainability",
    description: "Reduce waste by sharing books instead of buying new ones.",
  },
];

function SecondSection(props: Props) {
  const {} = props;

  return (
    <>
      <div className="flex flex-col max-w-7xl m-auto  ">
        <div className=" border-y w-full h-10 sm:h-30 "></div>
        <div className="w-full flex flex-col justify-evenly text-center items-center  gap-5 ">
          <Badge
            className="text-foreground bg-background  border-gray-700 "
            variant="default"
          >
            Features
          </Badge>

          <h1 className="text-3xl sm:text-4xl">
            Everything You Need to <br />
            <span className="text-green-600">Share and Discover Books</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Whether you're looking to save money on books or earn extra income
            from your collection, BookRent has you covered.
          </p>
        </div>
    <div className="flex justify-center items-center max-w-7xl w-auto" >

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-20 ">
          {cardData.map((card, index) => {
            const CardIcon = card.icon;

            return (
              <Card className="w-80 hover:scale-105 transition-all  hover:shadow-[2px 2px 2px black] hover:shadow-amber-50  border rounded-2xl h-80" key={index}>
                <CardHeader key={index}>
                  <CardDescription  key={index}>
                    <CardIcon className="text-white" />
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-2xl font-bold" > {card.title} </CardContent>
                <CardFooter className="text-gray-400" >{card.description}</CardFooter>
              </Card>
            );
          })}
        </div>
            </div>

      </div>
    </>
  );
}

export default SecondSection;
