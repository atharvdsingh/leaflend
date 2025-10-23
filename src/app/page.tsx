import Apk from "@/components/apk";
import { dir } from "console";
import Image from "next/image";

export  async function GetALLBooks(){
  const body = await fetch("http://localhost:3000/api/mybooks")
  console.log( await body.json(),
    "hello wrold"
  )

}


export default async function Home() {
   await GetALLBooks();
  return (
    <div>
      <Apk/>

    </div>
  );
}
