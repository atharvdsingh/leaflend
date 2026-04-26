"use client";
import axios from "axios";
import { handleClientError } from "@/util/clientError";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { createBookType, createBookSchema } from "@/schema/books.schema"
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
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
import { createBook } from "@/services/mybook.services";
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

  const router = useRouter();

  const { register, handleSubmit, formState, control, setValue } = useForm<createBookType>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      bookType: "AllGenres",

    },
  });
  // ... inside component ...

  // ... inside component ...

  useEffect(() => {





  }, [formState.errors])

  useEffect(() => {

    if (roomId) {
      setValue("roomId", Number(roomId))

    }

  }, [roomId, setValue])


  const onSubmit: SubmitHandler<createBookType> = async (
    data: createBookType
  ) => {
    console.log(data)
    setLoading(true);
    try {
      const formdata = buildBookFormData(data);

      console.log(formdata.values)
      console.log(formState.errors)

      // Include roomId if present in URL

      //      title: string;
      // author: string;
      // genre: string;
      // price: number;
      // cover: FileList;
      // description: string;
      console.log("this is form data ", formdata.keys())
      console.log("formdata values ", Object.fromEntries(formdata.entries()))

      const res = await createBook(formdata);
      if (res.status == 200) {

        toast.success("Book posted successfully!");
        router.refresh();
        setOpen(false);
      }
    } catch (error: unknown) {
      console.log(error, "error")
      handleClientError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm" className="md:px-4 px-2">
        <span className="">Post a Book</span>
        <Plus className=" h-4 w-4" />
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
              {formState.errors.bookname && <p className="text-red-500">{formState.errors.bookname.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>

              <Input id="author" {...register("author")} />
              {formState.errors.author && <p className="text-red-500">{formState.errors.author.message}</p>}
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
                <Label htmlFor="price">Price per Week (₹) *</Label>

                <Input
                  id="price"
                  type="number"
                  placeholder={"0"}
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                />
                {formState.errors.price && <p className="text-red-500">{formState.errors.price.message}</p>}
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

  if (data.price !== undefined && !Number.isNaN(data.price)) {
    fd.append("price", data.price.toString());
  }

  fd.append("bookname", data.bookname);
  if (data.author) fd.append("author", data.author);
  if (data.description) fd.append("description", data.description);

  fd.append("bookType", data.bookType);
  fd.append("cover", data.cover);
  if (data.roomId) fd.append("roomId", data.roomId.toString());

  return fd;
}
