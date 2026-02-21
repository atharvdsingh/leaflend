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
    <div className="bg-muted border border-border rounded-xl p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-muted rounded-lg" />
          <div className="space-y-2">
            <div className="h-5 w-32 bg-muted rounded" />
            <div className="h-4 w-20 bg-muted rounded" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-10 w-full bg-muted rounded" />
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
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-border rounded-xl bg-muted/20">
        <div className="bg-muted p-4 rounded-full mb-4">
          <DoorOpen size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No Rooms Yet</h3>
        <p className="text-muted-foreground max-w-sm mb-6">
          You haven't joined or created any rooms yet. Get started by creating your own community or joining an existing one.
        </p>
        <Button asChild variant="outline" className="border-border text-foreground/80 hover:text-foreground hover:bg-muted">
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
              <Crown className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-medium text-foreground">Rooms I Created</h2>
            </div>
            <p className="text-sm text-muted-foreground">Rooms where you are the creator</p>
          </div>
          <Badge variant="outline" className="border-border text-muted-foreground bg-muted">
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
          <div className="py-8 px-6 bg-muted/30 border border-dashed border-border rounded-xl text-center">
            <p className="text-muted-foreground">You haven't created any rooms yet.</p>
          </div>
        )}
      </section>

      {/* Joined Rooms Section */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-medium text-foreground">Rooms I Joined</h2>
            </div>
            <p className="text-sm text-muted-foreground">Rooms where you are a member</p>
          </div>
          <Badge variant="outline" className="border-border text-muted-foreground bg-muted">
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
          <div className="flex flex-col items-center justify-center py-12 px-6 bg-muted/30 border border-dashed border-border rounded-xl text-center">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">You haven't joined any rooms yet.</p>
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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-background border border-border p-8 sm:p-10">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users className="w-64 h-64 text-foreground transform translate-x-1/3 -translate-y-1/3" />
          </div>

          <div className="relative z-10 space-y-6">
            <Link
              href="/room"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Browse Rooms
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-foreground tracking-tight">My Rooms</h1>
                <p className="text-muted-foreground max-w-xl">
                  Manage your communities. Create new rooms to share books or access the ones you've already joined.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative group w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-foreground/80 transition-colors" />
                <Input
                  placeholder="Search rooms..."
                  className="bg-card/40 border-border/50 pl-10 h-11 focus:bg-card focus:ring-1 focus:ring-border transition-all text-sm rounded-xl"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-muted/50 rounded-lg border border-border/50">
                  <span className="text-xs text-muted-foreground font-medium">
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
