import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/util/Prisma";
import CenterComponent from "@/components/CenterComponent";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Users, DoorOpen, Users2 } from "lucide-react";
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
      <div className="flex flex-col items-center justify-center py-20 gap-4 border border-zinc-800 rounded-xl bg-zinc-900/50">
        <DoorOpen size={48} className="text-zinc-500" />
        <p className="text-zinc-400 text-lg">
          You haven&apos;t joined any rooms yet.
        </p>
        <Button asChild variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
          <Link href="/room">Browse Rooms</Link>
        </Button>
      </div>
    );
  }

  const ownedRooms = rooms.filter((room) =>
    room.members.some((m) => m.memberId === userId && m.roomRole === "ADMIN")
  );

  const joinedRooms = rooms.filter((room) =>
    !room.members.some((m) => m.memberId === userId && m.roomRole === "ADMIN")
  );

  const RoomCard = ({ room }: { room: typeof rooms[0] }) => {
    const admin = room.members.find((m) => m.roomRole === "ADMIN");
    return (
      <div
        className="border border-zinc-800 rounded-xl px-5 py-4 hover:border-zinc-600 transition-colors bg-black"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
              <Users size={20} className="text-zinc-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{room.roomName}</span>
                <span className="text-xs bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-800">
                  {room.members.length} members
                </span>
              </div>
              {admin && (
                <p className="text-zinc-500 text-sm">
                  Created by {admin.member.name || "Unknown"}
                </p>
              )}
            </div>
          </div>

          <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800" asChild>
            <Link
              href={`/home?room=${room.id}&page=1`}
              className="flex items-center gap-1"
            >
              <ArrowRight size={16} />
              Open
            </Link>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-10">
      {ownedRooms.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white border-b border-zinc-800 pb-2">Created By You</h2>
          <div className="grid gap-3">
            {ownedRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      )}

      {joinedRooms.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white border-b border-zinc-800 pb-2">Joined Rooms</h2>
          <div className="grid gap-3">
            {joinedRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      )}
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
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">My Rooms</h1>

        <Suspense fallback={<MyRoomsSkeleton />}>
          <RoomList userId={Number(id)} />
        </Suspense>
      </div>
    </CenterComponent>
  );
}

export default Page;
