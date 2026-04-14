import Chatpage from "@/components/chat/Chatpage";
import { GetTheSession } from "@/util/GetTheSession";

export default async function page({params}:{params:Promise<{roomId:string}>}) {
    const {roomId} = await params;
    const session= await GetTheSession()
    console.log(roomId)
    return (
        <div>
            <Chatpage roomId={roomId} userId={session?.user.id!} ></Chatpage>
        </div>
    );
}