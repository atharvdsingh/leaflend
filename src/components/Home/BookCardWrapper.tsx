"use client";

import type { booksHave } from "@prisma/client";
import React, { useEffect } from "react";
import MyBooksCard from "./MybooksCard";
import { useDispatch, useSelector } from "react-redux";
import { setMyAllBooks } from "@/store/features/mybookSlice";
import type { SerializableBook } from "@/app/types/bookstypeforRedux";
import type { RootState } from "@/store/store";

interface Props {
  books: booksHave[];
}

function BookCardWrapper({ books = [] }: Props) {
  const dispatch = useDispatch();
  const book=useSelector((state:RootState)=>state.mybooks.myallBooks)

  useEffect(() => {
    const dispatcherBooks: SerializableBook[] = books.map(book => ({
      ...book,
      publishDate: book.publishDate.toString(),
    }));

    dispatch(setMyAllBooks(dispatcherBooks));
  }, [books, dispatch]);

  return (
    <>
      {books.map(book => (
        <MyBooksCard key={book.id} {...book} />
      ))}
    </>
  );
}

export default BookCardWrapper;
