import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/util/Prisma";
import CenterComponent from "@/components/CenterComponent";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Users, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {       
  params: Promise<{ id: string }>;
}

/* ── Skeleton shown while rooms load ── */
function RoomCardSkeleton() {
  return (
    <div className="border border-gray-700 rounded-xl p-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-gray-700 rounded" />
            <div className="h-3 w-20 bg-gray-800 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-7 w-24 bg-gray-700 rounded-full" />
          <div className="h-9 w-20 bg-gray-700 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function MyRoomsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <RoomCardSkeleton key={i} />
      ))}
    </div>
  );
}

/* ── Server component that fetches rooms ── */
async function RoomList({ userId }: { userId: number }) {
  const rooms = await prisma.room.findMany({
    where: {
      members: {
        some: {
          memberId: userId,
          status: "ACTIVE",
        },
      },
    },
    include: {
      members: {
        where: { status: "ACTIVE" },
        include: { member: true },
      },
      books: true,
    },
  });

  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <DoorOpen size={48} className="text-gray-500" />
        <p className="text-gray-400 text-lg">
          You haven&apos;t joined any rooms yet.
        </p>
        <Button asChild>
          <Link href="/room">Browse Rooms</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {rooms.map((room) => {
        const admin = room.members.find((m) => m.roomRole === "ADMIN");
        return (
          <div
            key={room.id}
            className="border border-gray-700 rounded-xl px-5 py-4 hover:border-gray-500 transition-colors bg-card"
          >
            <div className="flex items-center justify-between">
              {/* Left: Icon + Room Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  <Users size={20} className="text-gray-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{room.roomName}</span>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                      Joined
                    </span>
                  </div>
                  {admin && (
                    <p className="text-gray-500 text-sm">
                      Created by {admin.member.name || "Unknown"}
                    </p>
                  )}
                </div>
              </div>

              {/* Right: Member count + Enter */}
              <div className="flex items-center gap-2">
                <span className="text-sm border border-gray-600 rounded-full px-3 py-1 text-gray-300">
                  {room.members.length} members
                </span>
                <Button size="sm" variant="outline" asChild>
                  <Link
                    href={`/home?room=${room.id}&page=1`}
                    className="flex items-center gap-1"
                  >
                    <ArrowRight size={16} />
                    Enter
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main Page ── */
async function Page({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    redirect("/");
  }

  const { id } = await params;

  if (String(session.user.id) !== id) {
    redirect("/room");
  }

  return (
    <CenterComponent className="min-h-screen py-10">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/room">
              <ArrowLeft size={20} />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">My Rooms</h1>
        </div>

        {/* Room List wrapped in Suspense */}
        <Suspense fallback={<MyRoomsSkeleton />}>
          <RoomList userId={Number(id)} />
        </Suspense>
      </div>
    </CenterComponent>
  );
}

export default Page;
