import Chatpage from "@/components/chat/Chatpage";

export default async function page({params}:{params:Promise<{roomId:string}>}) {
    const {roomId} = await params;
    return (
        <div>
            <Chatpage roomId={roomId} ></Chatpage>
        </div>
    );
}