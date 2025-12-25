import { Frown } from "lucide-react";
import React from "react";


function NoBooks() {

  return (
    <>
      <div className="flex justify-center flex-col gap-3  items-center">
        <Frown className=" opacity-50 scale-200" />
        <p className="opacity-50">No Books Available</p>
      </div>
    </>
  );
}

export default NoBooks;
