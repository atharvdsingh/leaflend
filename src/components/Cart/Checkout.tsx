"use client";
import React, { useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";


function Checkout() {
    const [loading,setLoading]=useState(false)
  const NoOfBooks = useSelector((items: RootState) => items.cart);
  const booksId=NoOfBooks.books.map((books)=>books.id)
  console.log(booksId)
  const handleOnclick = async () => {
    try {
        setLoading(true)
        console.log("putting the id ")
        console.log(booksId);
        
        const data=await axios.post("http://localhost:3000/api/rentbook",booksId) 
        if(data.status!=200){
            toast.error("something went wrong")
            return ;
        }
        console.log("error ",data)
        toast("books have been rented")
    } catch (error) {

        
    }



  };

  return (
    <>
      <div className="flex flex-col p-4 border max-w-7xl w-full m-auto ">
        <Card className="flex border-0  w-full flex-col">
          <CardHeader>
            <CardTitle className="flex w-full  justify-between   items-center ">
              <p>items</p> <p>{NoOfBooks.NoOfBooks}</p>{" "}
            </CardTitle>
          </CardHeader>

          <CardFooter>
            <Button className="w-full font-bold " onClick={handleOnclick}>
              Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Checkout;
