import CenterComponent from "@/components/CenterComponent";
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CreateRoomCard from "@/components/room/CreateRoomCard";
import JoinRoomCard from "@/components/room/JoinRoomCard";
import { Home, Users, WarehouseIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PublicRoomCard from "@/components/room/PublicRoomCard";

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    redirect("./");
  }

  return (
    <CenterComponent className="min-h-screen py-20 px-4">
      <div className="flex flex-col gap-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground/90 to-foreground/50 bg-clip-text text-transparent">
              BookRent Rooms
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Create a new room or join an existing community to start sharing and renting books.
            </p>
          </div>

          <Button asChild className="shrink-0" size="lg">
            <Link className="flex items-center gap-2" href={`/room/my-rooms/${session.user.id}`}>
              <WarehouseIcon className="w-5 h-5" />
              <span>My Rooms</span>
            </Link>
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <CreateRoomCard />
          <JoinRoomCard />
          <PublicRoomCard />
        </div>
      </div>
    </CenterComponent>
  );
}

export default Page;
