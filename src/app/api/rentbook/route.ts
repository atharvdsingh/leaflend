import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(request:Request){
    const body = await request.json()
    const session = await getServerSession(authOptions)
    const _id=session?.user.id
    return nexxtre
}