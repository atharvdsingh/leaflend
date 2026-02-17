"use client";
import axios from "axios";
import { handleClientError } from "@/util/clientError";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { createBookType, createBookSchema } from "@/schema/books.schema";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, FileUpIcon, Paperclip, Upload, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner"; // optional (if you use Shadcn toast)
import { $Enums, BookType } from "@prisma/client";
import z, { object } from "zod";
import { api } from "@/lib/axios";
import { useSearchParams } from "next/navigation";

export interface PostBookFormData {
  title: string;
  author: string;
  genre: string;
  price: number;
  cover: FileList;
  description: string;
}

interface ErrorType {
  message: string;
}

export default function CreateBook() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  console.log(searchParams, "search params")
  const roomId = searchParams.get("room");
  console.log(roomId, "roomi d")

  const { register, handleSubmit, formState, control, setValue } = useForm<createBookType>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      bookType: "AllGenres",

    },
  });
  console.log(formState.errors)
  // ... inside component ...

  // ... inside component ...

  const onSubmit: SubmitHandler<createBookType> = async (
    data: createBookType
  ) => {
    setLoading(true);
    console.log("hello world");
    try {
      const formdata = buildBookFormData(data);

      // Include roomId if present in URL
      if (roomId) {
        formdata.append("roomId", roomId);
      }
      //      title: string;
      // author: string;
      // genre: string;
      // price: number;
      // cover: FileList;
      // description: string;

      const res = await api.post(
        "/mybooks",
        formdata
      );
      if (res.status == 200) {

        toast.success("Book posted successfully!");
        setOpen(false);
      }
    } catch (error: unknown) {
      handleClientError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm" className="md:px-4 px-2">
        <span className="hidden md:inline">Post a Book</span>
        <Plus className="md:hidden h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post a Book for Rent</DialogTitle>
            <DialogDescription>
              List your book and start earning by renting it to others
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title *</Label>
              <Input id="title" {...register("bookname")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>

              <Input id="author" {...register("author")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre *</Label>
                <Controller
                  name="bookType"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="genre">
                        <SelectValue placeholder="Select Genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(BookType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price per Week ($) *</Label>

                <Input
                  id="price"
                  type="number"
                  placeholder={"0"}
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>

            <div className="space-y-2">
              {/* <Label htmlFor="coverUrl">Cover Image URL *</Label> */}
              <div className="flex items-center-safe gap-2">
                {/* <Input
                  id="coverUrl"
                  value={formData.coverUrl}
                  onChange={(e) => handleChange("coverUrl", e.target.value)}
                  required
                /> */}
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setValue("cover", file)
                    }
                  }}
                />
                <Paperclip className="relative right-10 " />
              </div>
              <p className="text-sm text-muted-foreground">
                book&apos;s cover image
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Posting..." : "Post Book"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function buildBookFormData(data: createBookType) {
  const fd = new FormData();
  const pricne = data.price!.toString();

  fd.append("bookname", data.bookname);
  fd.append("author", data.author!);
  fd.append("description", data.description!);
  fd.append("price", pricne);
  fd.append("bookType", data.bookType);
  fd.append("cover", data.cover);
  fd.append("room", data.roomId.toString())

  return fd;
}
