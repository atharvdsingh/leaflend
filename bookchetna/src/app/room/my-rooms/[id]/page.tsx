import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/util/Prisma";
import CenterComponent from "@/components/CenterComponent";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Users,
  Calendar,
  KeyRound,
  Crown,
  Trash2,
  Lock,
  DoorOpen,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RoomCard } from "@/components/room/RoomCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

/* ── Skeleton shown while rooms load ── */
function RoomCardSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-zinc-800 rounded-lg" />
          <div className="space-y-2">
            <div className="h-5 w-32 bg-zinc-800 rounded" />
            <div className="h-4 w-20 bg-zinc-800 rounded" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full bg-zinc-800 rounded" />
        <div className="h-10 w-full bg-zinc-800 rounded" />
      </div>
    </div>
  );
}

function MyRoomsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <RoomCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}


/* ── Server Component ── */
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

  const ownedRooms = rooms.filter((room) =>
    room.members.some((m) => m.memberId === userId && m.roomRole === "ADMIN")
  );

  const joinedRooms = rooms.filter((room) =>
    !room.members.some((m) => m.memberId === userId && m.roomRole === "ADMIN")
  );

  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
        <div className="bg-zinc-900 p-4 rounded-full mb-4">
          <DoorOpen size={32} className="text-zinc-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Rooms Yet</h3>
        <p className="text-zinc-400 max-w-sm mb-6">
          You haven't joined or created any rooms yet. Get started by creating your own community or joining an existing one.
        </p>
        <Button asChild variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
          <Link href="/room">Browse Rooms</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Created Rooms Section */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-zinc-400" />
              <h2 className="text-lg font-medium text-white">Rooms I Created</h2>
            </div>
            <p className="text-sm text-zinc-500">Rooms where you are the creator</p>
          </div>
          <Badge variant="outline" className="border-zinc-800 text-zinc-400 bg-zinc-900">
            {ownedRooms.length} room{ownedRooms.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        {ownedRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ownedRooms.map((room) => (
              <RoomCard key={room.id} room={room} isAdmin={true} />
            ))}
          </div>
        ) : (
          <div className="py-8 px-6 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-xl text-center">
            <p className="text-zinc-500">You haven't created any rooms yet.</p>
          </div>
        )}
      </section>

      {/* Joined Rooms Section */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-zinc-400" />
              <h2 className="text-lg font-medium text-white">Rooms I Joined</h2>
            </div>
            <p className="text-sm text-zinc-500">Rooms where you are a member</p>
          </div>
          <Badge variant="outline" className="border-zinc-800 text-zinc-400 bg-zinc-900">
            {joinedRooms.length} room{joinedRooms.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        {joinedRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {joinedRooms.map((room) => (
              <RoomCard key={room.id} room={room} isAdmin={false} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-6 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-xl text-center">
            <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-zinc-600" />
            </div>
            <p className="text-zinc-500">You haven't joined any rooms yet.</p>
          </div>
        )}
      </section>
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
      <div className="flex flex-col gap-10 max-w-6xl mx-auto">
        {/* Header Section with Gradient Background */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 sm:p-10">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users className="w-64 h-64 text-white transform translate-x-1/3 -translate-y-1/3" />
          </div>

          <div className="relative z-10 space-y-6">
            <Link
              href="/room"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Browse Rooms
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-white tracking-tight">My Rooms</h1>
                <p className="text-zinc-400 max-w-xl">
                  Manage your communities. Create new rooms to share books or access the ones you've already joined.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative group w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-zinc-300 transition-colors" />
                <Input
                  placeholder="Search rooms..."
                  className="bg-black/40 border-zinc-700/50 pl-10 h-11 focus:bg-black focus:ring-1 focus:ring-zinc-700 transition-all text-sm rounded-xl"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <span className="text-xs text-zinc-400 font-medium">
                    {session.user.name || "User"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Suspense fallback={<MyRoomsSkeleton />}>
          <RoomList userId={Number(id)} />
        </Suspense>
      </div>
    </CenterComponent>
  );
}

export default Page;
