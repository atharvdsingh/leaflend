import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";
import { handleApiError } from "@/util/HandleError";
import { AppError } from "@/util/AppError";
import { GetTheSession } from "@/util/GetTheSession";
import { buildBookFormData } from "@/components/CreateBook";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const _id = session?.user.id;
    if (!_id) {
      throw new AppError("User is not logged in", 401, "UNAUTHORIZED");
    }

    // const response = await prisma.borrowsBooks.findMany({
    //   where: {
    //     id: _id,
    //   },
    // });
    // return NextResponse.json(response);
    return NextResponse.json({ message: "Not implemented" }); // Placeholder to avoid empty response if uncommented
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const booksId: number[] = await req.json();
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      throw new AppError("Bad Request: User not logged in", 401, "UNAUTHORIZED");
    }
    if (booksId.length == 0) {
      throw new AppError("Zero books requested", 400, "INVALID_INPUT");
    }
    await prisma.$transaction(async (tx) => {
      for (const books of booksId) {

        const bookFromDatabase =
          await tx.booksHave.findUnique({
            where: {
              id: books,
            },
            include: {
              room: true
            }
          });

        if (!bookFromDatabase) {
          throw new AppError("Book not Available", 404, "BOOK_NOT_FOUND");
        }

        // Validate room membership - user must be in the same room as the book
        const bookRoomIds = bookFromDatabase.room.map(r => r.roomId);
        if (bookRoomIds.length > 0) {
          const userMembership = await tx.roomMembership.findFirst({
            where: {
              memberId: session.user.id,
              roomId: { in: bookRoomIds },
              status: "ACTIVE"
            }
          });
          if (!userMembership) {
            throw new AppError("You must join the room to rent this book", 403, "NOT_ROOM_MEMBER");
          }
        }

        if (bookFromDatabase.status != "AVAILABLE") {
          throw new AppError("Book not Available", 409, "BOOK_UNAVAILABLE");
        }

        if (bookFromDatabase.ownerId === session.user.id) {
          throw new AppError("You cannot rent your own book", 400, "INVALID_OPERATION");
        }

        const UserAlreadyRequestedForBook = await tx.rentalRequest.findFirst({
          where: {
            bookId: books,
            requesterId: session.user.id,
          },
        });

        if (UserAlreadyRequestedForBook) {
          throw new AppError("Already requested this book", 409, "DUPLICATE_REQUEST");
        }

        await tx.rentalRequest.create({
          data: {
            bookId: bookFromDatabase.id,
            requesterId: session.user.id,
            ownerId: bookFromDatabase.ownerId,
          },
        });
        tx.booksHave.update({
          where: {
            id: bookFromDatabase.id
          },
          data: {
            status: "RESERVED"
          }

        })
      }



      return true;
    });

    return NextResponse.json(
      {
        message: "Order have Been Placed",
        success: true,
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    return handleApiError(error);
  }
}


export async function PUT(request: NextRequest) {

  try {
    const session = await GetTheSession()
    if (!session?.user.id) {
      throw new AppError("not authenticated", 400)
    }

    const body: {
      id: number
    } = await request.json()
    console.log(body)

    const res = await prisma.$transaction(async (tx) => {
      const res = await tx.rentalRequest.update({
        where: {
          id: body.id
        }, data: {
          status: "ACCEPTED"
        },




      })
      await tx.booksHave.update({
        where: {
          id: res.bookId
        },
        data: {
          status: "BORROWED"
        }
      })

      if (!res) {
        throw new AppError("cound not proceed", 500)
      }

      return res
    })
    if (!res) {
      throw new AppError("Something went wrong", 500)
    }
    return NextResponse.json({ message: "Book have been given", success: true }, { status: 200 })


  } catch (error) {
    console.log(error)
    return handleApiError(error)

  }

}           }
          });
if (!userMembership) {
  throw new AppError("You must join the room to rent this book", 403, "NOT_ROOM_MEMBER");
}
        }

if (bookFromDatabase.status != "AVAILABLE") {
  throw new AppError("Book not Available", 409, "BOOK_UNAVAILABLE");
}

if (bookFromDatabase.ownerId === session.user.id) {
  throw new AppError("You cannot rent your own book", 400, "INVALID_OPERATION");
}

const UserAlreadyRequestedForBook = await tx.rentalRequest.findFirst({
  where: {
    bookId: books,
    requesterId: session.user.id,
  },
});

if (UserAlreadyRequestedForBook) {
  throw new AppError("Already requested this book", 409, "DUPLICATE_REQUEST");
}

await tx.rentalRequest.create({
  data: {
    bookId: bookFromDatabase.id,
    requesterId: session.user.id,
    ownerId: bookFromDatabase.ownerId,
  },
});
tx.booksHave.update({
  where: {
    id: bookFromDatabase.id
  },
  data: {
    status: "RESERVED"
  }

})
      }



return true;
    });

return NextResponse.json(
  {
    message: "Order have Been Placed",
    success: true,
  },
  {
    status: 200,
  }
);

  } catch (error) {
  return handleApiError(error);
}
}


export async function PUT(request: NextRequest) {

  try {
    const session = await GetTheSession()
    if (!session?.user.id) {
      throw new AppError("not authenticated", 400)
    }

    const body: {
      id: number
    } = await request.json()
    console.log(body)

    const res = await prisma.$transaction(async (tx) => {
      const res = await tx.rentalRequest.update({
        where: {
          id: body.id
        }, data: {
          status: "ACCEPTED"
        },




      })
      await tx.booksHave.update({
        where: {
          id: res.bookId
        },
        data: {
          status: "BORROWED"
        }
      })

      if (!res) {
        throw new AppError("cound not proceed", 500)
      }

      return res
    })
    if (!res) {
      throw new AppError("Something went wrong", 500)
    }
    return NextResponse.json({ message: "Book have been given", success: true }, { status: 200 })


  } catch (error) {
    console.log(error)
    return handleApiError(error)

  }

}