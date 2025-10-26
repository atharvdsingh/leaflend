"use client";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

import React, { useState } from "react";
import { FileUp, FileUpIcon, Paperclip, Upload } from "lucide-react";
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
import { CreateBookType } from "@/app/types/databaseRoutesType";

export interface PostBookFormData {
  title: string;
  author: string;
  genre: string;
  price: number;
  coverUrl: string;
  description: string;
}

interface ErrorType {
  message: String;
}

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Sci-Fi",
  "Fantasy",
  "Romance",
  "Thriller",
  "Biography",
  "History",
  "Classic",
  "Contemporary",
  "Young Adult",
  "Children",
  "Self-Help",
];

export default function CreateBook() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<CreateBookType>();

  const onSubmit: SubmitHandler<CreateBookType> = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/mybooks", data);
      // fetch("/api/my-books", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      toast.success("Book posted successfully!");

      setOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Client Error:", error.message);
      } else {
        console.error("Unknown Client Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Post a Book</Button>

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
                <Select {...register("genres")} required>
                  <SelectTrigger id="genre">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENRES.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price per Week ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  {...register("price")}
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
                <Input type="file" className="" placeholder="input file" />{" "}
                <Paperclip className="relative right-10 " />
              </div>
              <p className="text-sm text-muted-foreground">
                book's cover image
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
