"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { handleClientError } from "@/util/clientError";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useSession, signIn } from "next-auth/react";

interface Props {
  roomId: number;
}

function JoinRoom(props: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const { roomId } = props;
  const [Loading, setLoading] = useState<boolean>(false);
  async function handleJoinRoom() {
    if (!session?.user) {
      toast.error("Please login to join a room");
      signIn();
      return;
    }

    try {
      setLoading(true);

      console.log(roomId);
      const respons = await api.post("/room/public", { roomId: roomId });
      console.log(respons);
      if (respons.data.success != true) {
        toast.error("something wrong wrong");
      }
      toast.success("joined successfully");
      router.push(`/home?room=${roomId}&page=1/`);
    } catch (error) {
      handleClientError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        disabled={Loading}
        onClick={handleJoinRoom}
        // href={`/room/${room.id}`}
        className={`inline-flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 rounded-md ${Loading ? "bg-gray-500" : ""} `}
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden md:flex">Join</span>
      </Button>
    </>
  );
}

export default JoinRoom;
