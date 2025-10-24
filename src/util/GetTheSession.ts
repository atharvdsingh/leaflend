import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GetTheSession(){
    const session=await getServerSession(authOptions)
    return session

}