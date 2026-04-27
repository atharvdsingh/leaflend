"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Globe, Lock, Loader2 } from "lucide-react"; // Added Loader2 for the spinner
import { toast } from "sonner";
import { createRoom } from "@/services/room.services";
import { handleClientError } from "@/util/clientError";
import { useRouter } from "next/navigation";

function CreateRoomCard() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false); // 1. Added loading state
  const router = useRouter();

  const specialCharRegex = /[^a-zA-Z0-9 ]/g;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalValue = e.target.value;
    const cleanValue = originalValue.replace(specialCharRegex, "");

    if (originalValue !== cleanValue) {
      toast.error("Special characters are not allowed", {
        id: "validation-toast",
      });
    }
    setName(cleanValue);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (name.length < 5) {
      return toast.error("Room name must be at least 5 characters long");
    }

    setIsLoading(true); // 2. Start loading
    try {
      const visibility = isPublic ? ("SHOW" as const) : ("HIDE" as const);
      const body = await createRoom(name, description, visibility);

      if (body.status !== 200) {
        toast.error("Something Went Wrong");
        setIsLoading(false); 
        return;
      }

      toast.success("Room created successfully");
      router.push(`./home?room=${body.data.data.id}&page=1/`);
      // We don't necessarily need to set loading to false here since we are redirecting
    } catch (error) {
      handleClientError(error);
      setIsLoading(false); // 3. Stop loading on error
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full h-full" asChild>
          <Button
            variant="ghost"
            className="w-full h-auto py-8 hover:bg-muted border-border border hover:border-border/80 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 bg-card"
          >
            <div className="flex flex-col gap-3 justify-center items-center">
              <Plus className="bg-primary size-16 p-3 text-primary-foreground rounded-full group-hover:scale-110 transition-transform duration-300" />
              <div className="text-center">
                <p className="text-xl text-foreground font-semibold mb-1">
                  Create New Room
                </p>
                <p className="text-muted-foreground font-normal">
                  Start a new book sharing community
                </p>
              </div>
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create New Room</DialogTitle>
              <DialogDescription>
                Start a new book sharing community. You&apos;ll be the room creator.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Room Name</Label>
                <Input
                  id="name-1"
                  placeholder="eg. hostelclub"
                  value={name}
                  onChange={handleNameChange}
                  disabled={isLoading} // Disable input while loading
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="eg. book renting for hostels name"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isLoading} // Disable input while loading
                />
              </div>

              <div
                onClick={() => !isLoading && setIsPublic(!isPublic)} // Prevent toggle while loading
                className={`flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30 transition-colors ${
                    isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-muted/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isPublic ? (
                    <Globe className="w-4 h-4 text-green-500" />
                  ) : (
                    <Lock className="w-4 h-4 text-orange-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {isPublic ? "Public Room" : "Private Room"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isPublic ? "Anyone can discover" : "Invite only"}
                    </p>
                  </div>
                </div>
                <div className={`relative w-10 h-5 rounded-full transition-colors ${isPublic ? "bg-green-500" : "bg-muted-foreground/30"}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isPublic ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isLoading}>Cancel</Button>
              </DialogClose>
              
              {/* 4. Dynamic Loading Button */}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Room <Plus className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateRoomCard;
