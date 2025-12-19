import type { SerializableBook } from "@/app/types/bookstypeforRedux";
import { handleApiError } from "@/util/HandleError";
import { prisma } from "@/util/Prisma";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import type { CreateBookType } from "@/app/types/databaseRoutesType";

export async function POST(request:Request){
    const session=await getServerSession(authOptions);
    
    if(!session?.user.id){
        return NextResponse.json({
            message:"use is not logged in",
            success:"false"
        },{
            status:400
        })
    }
    try {
        const body= await request.json();

        console.log(body)
        const respons=await prisma.booksHave.delete({
            where:{
                id:body.id
            }
        })
        if(!respons){
            return NextResponse.json({respons, message:"soemthing wend wrong"},{status:500})
        }
        if(respons){
            return NextResponse.json(respons,{status:200})
        }
        
    } catch (error) {
        return handleApiError(error);
        console.log("hi there it is error")
        
    }

}