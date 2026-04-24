"use client";

import React from "react";
import Image from "next/image";
import type { booksHave } from "@prisma/client";
import { ShoppingCart, Calendar, User, BookOpen } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface BookDetailDialogProps {
    book: booksHave;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAddToCart: () => void;
    isCartDisabled: boolean;
}

export default function BookDetailDialog({
    book,
    open,
    onOpenChange,
    onAddToCart,
    isCartDisabled,
}: BookDetailDialogProps) {
    const statusColorMap: Record<string, string> = {
        AVAILABLE: "bg-green-600/90 text-white border-green-500",
        RESERVED: "bg-amber-600/90 text-white border-amber-500",
        BORROWED: "bg-red-600/90 text-white border-red-500",
    };

    const formattedDate = new Date(book.publishDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-4 rounded-2xl overflow-hidden bg-card border-border gap-0">
                <div className="relative w-full h-52 sm:h-64">
                    <Image
                        src={book.cover || "/1.jpg"}
                        alt={`Cover of ${book.bookname}${book.author ? ` by ${book.author}` : ""}`}
                        fill
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88eLFfwAJowPFn/oYQgAAAABJRU5ErkJggg=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </div>

                <div className="px-5 pb-5 -mt-10 relative z-10">
                    <DialogHeader className="gap-1">
                        <DialogTitle className="text-xl font-bold text-card-foreground leading-tight">
                            {book.bookname}
                        </DialogTitle>
                        {book.author && (
                            <DialogDescription className="text-muted-foreground text-sm flex items-center gap-1.5">
                                <User className="h-3.5 w-3.5" />
                                by {book.author}
                            </DialogDescription>
                        )}
                    </DialogHeader>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        <Badge
                            variant="outline"
                            className="text-xs font-medium"
                        >
                            <BookOpen className="h-3 w-3 mr-1" />
                            {book.bookType}
                        </Badge>
                        <Badge
                            className={`text-xs font-medium ${statusColorMap[book.status] || ""}`}
                        >
                            {book.status}
                        </Badge>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                Published
                            </span>
                            <span className="text-sm font-medium text-card-foreground">
                                {formattedDate}
                            </span>
                        </div>

                        {book.price !== null && book.price !== undefined && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Rental Price
                                </span>
                                <span className="text-base font-bold text-green-400">
                                    ₹{book.price}/week
                                </span>
                            </div>
                        )}
                    </div>

                    <Separator className="my-4" />

                    <DialogFooter className="sm:flex-col gap-2">
                        <Button
                            disabled={isCartDisabled}
                            onClick={() => {
                                onAddToCart();
                                onOpenChange(false);
                            }}
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/80 font-semibold"
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            {isCartDisabled ? "Unavailable" : "Add to Cart"}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}

