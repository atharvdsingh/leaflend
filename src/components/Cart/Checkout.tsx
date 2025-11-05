"use client";
import React, { useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

interface Props {}

function Checkout(props: Props) {
    const [loading,setLoading]=useState(false)
    const router=useRouter()
  const {} = props;
  const NoOfBooks = useSelector((items: RootState) => items.cart);
  const booksId=NoOfBooks.books.map((books)=>books.id)
  const handleOnclick = async () => {

    try {
        setLoading(true)
        const data=await axios.post("http://hocalhost:3000/api/rentbook",booksId) 
        if(data.status!=200){
            toast.error("something went wrong")
        }
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
