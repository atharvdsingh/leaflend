import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/util/Prisma";

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

export async function POST(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  interface bodyType {
    ownerID: string;
    booksname: string;
    cover: string;
    borrowfrom: number;
  }
  const body: bodyType = await request.json();
  const booksId: number = params.id;

  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json(
      {
        message: "user not logged in",
      },
      {
        status: 401,
      }
    );
  }
  const _id = session?.user?.id;
  try {
    const res = await prisma.booksHave.update({
      where: {
        id: booksId,
      },
      data: {
        status: "GIVEN",
      },
    });
    if (!res) {
      return NextResponse.json({
        message: "something went wrong while updating the user",
        res,
      });
    }
    const res2 = await prisma.borrowsBooks.create({
      data: {
        booksName: body.booksname,
        cover: body.cover,
        borrowFrom: body.borrowfrom,
      },
    });
    const res3 = await prisma.booksgiven.create({
      data: {
        givenTo: _id,
        cover: body.cover,
        booksName: body.booksname,
      },
    });
    if(!res3){
        return NextResponse.json({
            message:"something went wrong",res3
        },{status:500})
    }
  } catch (error) {
    return NextResponse.json({
        mesage:"error while adding the books to route",error
    })
  }
  return NextResponse.json({message:"send the request to add to your account"});
}
