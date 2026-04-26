"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { RemoveMemberByRoomId } from "@/actions/RoomService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RemoveMemberButton({
    roomId,
    memberId,
    memberName,
}: {
    roomId: number;
    memberId: number;
    memberName: string;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleRemoveMember = async () => {
        setLoading(true);
        toast.promise(RemoveMemberByRoomId(roomId, memberId), {
            loading: 'Removing member...',
            success: () => {
                router.refresh();
                setLoading(false);
                return `${memberName} has been removed from the room`;
            },
            error: (err) => {
                setLoading(false);
                return err.message || 'Failed to remove member';
            }
        });
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            onClick={handleRemoveMember}
            disabled={loading}
            aria-label={`Remove ${memberName}`}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    );
}
