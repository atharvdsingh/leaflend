import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    interface sessionType{
        email:string,
        name:string,
        id:string
    }
    const session=await getServerSession()
    if(!session){
        return new Response("Unauthorized", { status: 401 });
    }
     const userId = session.user.id;
    
    

}