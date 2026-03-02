"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllUsers, getUserInitials, type ChatUser } from "@/lib/chat-mock-data";
import { Plus, Search, X, Users, MessageSquare, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewConversationDialogProps {
    onCreateConversation: (memberIds: number[], name?: string, isGroup?: boolean) => void;
}

export function NewConversationDialog({ onCreateConversation }: NewConversationDialogProps) {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<ChatUser[]>([]);
    const [groupName, setGroupName] = useState("");
    const [step, setStep] = useState<"select" | "group-name">("select");

    const allUsers = getAllUsers();
    const filteredUsers = allUsers.filter(
        (u) =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isGroup = selectedUsers.length > 1;

    const toggleUser = (user: ChatUser) => {
        setSelectedUsers((prev) =>
            prev.find((u) => u.id === user.id)
                ? prev.filter((u) => u.id !== user.id)
                : [...prev, user]
        );
    };

    const handleContinue = () => {
        if (isGroup) {
            setStep("group-name");
        } else if (selectedUsers.length === 1) {
            onCreateConversation([selectedUsers[0].id]);
            handleClose();
        }
    };

    const handleCreateGroup = () => {
        onCreateConversation(
            selectedUsers.map((u) => u.id),
            groupName || undefined,
            true
        );
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
        setSearchQuery("");
        setSelectedUsers([]);
        setGroupName("");
        setStep("select");
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => (isOpen ? setOpen(true) : handleClose())}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60"
                >
                    <Plus className="h-5 w-5" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md p-0 gap-0 rounded-2xl overflow-hidden">
                {step === "select" && (
                    <>
                        <DialogHeader className="px-5 pt-5 pb-3">
                            <DialogTitle className="text-base font-semibold">
                                New Conversation
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground">
                                Select one person for a direct chat, or multiple for a group.
                            </DialogDescription>
                        </DialogHeader>

                        {/* Selected chips */}
                        {selectedUsers.length > 0 && (
                            <div className="px-5 pb-2 flex flex-wrap gap-1.5">
                                {selectedUsers.map((user) => (
                                    <Badge
                                        key={user.id}
                                        variant="secondary"
                                        className="pl-2 pr-1 py-1 rounded-full text-xs gap-1 border-0"
                                    >
                                        {user.name.split(" ")[0]}
                                        <button
                                            onClick={() => toggleUser(user)}
                                            className="h-4 w-4 rounded-full hover:bg-muted-foreground/20 flex items-center justify-center"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Search */}
                        <div className="px-5 pb-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 h-10 rounded-xl bg-muted/50 border-border text-sm"
                                />
                            </div>
                        </div>

                        {/* User list */}
                        <ScrollArea className="max-h-[300px]">
                            <div className="px-2 pb-2">
                                {filteredUsers.length === 0 ? (
                                    <p className="text-center text-sm text-muted-foreground py-8">
                                        No users found
                                    </p>
                                ) : (
                                    filteredUsers.map((user) => {
                                        const isSelected = selectedUsers.some((u) => u.id === user.id);
                                        return (
                                            <button
                                                key={user.id}
                                                onClick={() => toggleUser(user)}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
                                                    isSelected
                                                        ? "bg-primary/5 border border-primary/20"
                                                        : "hover:bg-muted/60 border border-transparent"
                                                )}
                                            >
                                                <div className="relative">
                                                    <Avatar className="h-10 w-10 border border-border">
                                                        <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                                                            {getUserInitials(user.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {user.isOnline && (
                                                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-background" />
                                                    )}
                                                </div>
                                                <div className="flex-1 text-left min-w-0">
                                                    <p className="text-sm font-medium text-foreground truncate">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-[11px] text-muted-foreground truncate">
                                                        {user.email}
                                                    </p>
                                                </div>
                                                {isSelected && (
                                                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                                                        <Check className="h-3.5 w-3.5 text-primary-foreground" />
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </ScrollArea>

                        {/* Footer */}
                        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                                {selectedUsers.length} selected
                                {isGroup && " • Group chat"}
                            </span>
                            <Button
                                onClick={handleContinue}
                                disabled={selectedUsers.length === 0}
                                size="sm"
                                className="rounded-xl px-4"
                            >
                                {isGroup ? (
                                    <>
                                        <Users className="h-4 w-4 mr-1.5" />
                                        Create Group
                                    </>
                                ) : (
                                    <>
                                        <MessageSquare className="h-4 w-4 mr-1.5" />
                                        Start Chat
                                    </>
                                )}
                            </Button>
                        </div>
                    </>
                )}

                {step === "group-name" && (
                    <>
                        <DialogHeader className="px-5 pt-5 pb-3">
                            <DialogTitle className="text-base font-semibold">
                                Name your group
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground">
                                Give your group a name. You can change it later.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="px-5 pb-4 space-y-4">
                            {/* Group avatar preview */}
                            <div className="flex justify-center">
                                <div className="relative">
                                    <Avatar className="h-20 w-20 border-2 border-border">
                                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                                            <Users className="h-8 w-8" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <Badge className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0 h-5 rounded-full border-0 whitespace-nowrap">
                                        {selectedUsers.length + 1} members
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="group-name" className="text-xs text-muted-foreground">
                                    Group name
                                </Label>
                                <Input
                                    id="group-name"
                                    placeholder="e.g., Book Club, Study Group..."
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    className="h-10 rounded-xl bg-muted/50 border-border text-sm"
                                    autoFocus
                                />
                            </div>

                            {/* Member preview */}
                            <div className="flex -space-x-2">
                                {selectedUsers.slice(0, 5).map((user) => (
                                    <Avatar key={user.id} className="h-8 w-8 border-2 border-background">
                                        <AvatarFallback className="bg-muted text-muted-foreground text-[10px] font-medium">
                                            {getUserInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                ))}
                                {selectedUsers.length > 5 && (
                                    <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] text-muted-foreground font-medium">
                                        +{selectedUsers.length - 5}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setStep("select")}
                                className="rounded-xl"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleCreateGroup}
                                size="sm"
                                className="rounded-xl px-4"
                            >
                                Create Group
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
