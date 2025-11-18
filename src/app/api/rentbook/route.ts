import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";

export async function GET(){
   try {
     const session=await getServerSession(authOptions)
     const _id=session?.user.id
     if(!_id){
         return NextResponse.json({
             message:"user is not logged in"
         },{status:401})
     }
 
     const response=await prisma.borrowsBooks.findMany({
         where:{
             id:_id
         }
     })
     return NextResponse.json(response)
   } catch (error) {
    return NextResponse.json({message:`error ${error} `})
   }
}

export async function POST(req:NextRequest,res:NextResponse){
    try {
        const id= await req.json()
        console.log(id)

        const prismaRespons=await prisma.booksHave.delete({
            where:{
                id:id
            }
        })
        if(prismaRespons){

            return NextResponse.json({prismaRespons},{status:200})
        }
        console.log(prismaRespons)
        
    } catch (error) {
        return NextResponse.json({message:"some thing went wrong while deleting books",error})
        console.log(error)
        
    }
}
