import { handleApiError } from "@/util/HandleError";
import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){

    try {
        const session = await getServerSession()
        if(!session){
            console.log(session)
            return handleApiError("user is not logged in ")
        }
        const books:booksHave[]=await prisma.booksHave.findMany()
        return NextResponse.json(books,{status:200})
    } catch (error) {
        return handleApiError(error)
        
    }

}