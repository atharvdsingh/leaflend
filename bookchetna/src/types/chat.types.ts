export interface Message{
    content:string;
    senderId:string;
    roomId:number | string;
    timestamp:Date;
}
export interface serverToClient{
    receive_message:(message:Message)=>void;
    error:(error:string)=>void;
}
export interface clientToServer{
    send_message:(message:Message)=>void;
    join_room:(roomId:number | string)=>void;
   
}