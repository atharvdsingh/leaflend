import type { RentalRequest } from "@prisma/client";


export interface AllBooksType {
  id: number,
  bookname: string,
  cover: string,
  publishDate: Date,
  ownerId: number,
  status: bookAvailavleStatus
  genres: GENRES
}

export type RentalRequestCartType = (RentalRequest & {
  book: {
    bookname: string,
    cover: string,
    price: number,

  }, owner: {
    name: string | null
  }
})

export type RequestedBooksForApprovel = RentalRequest & {
  book: {
    cover: string | null
    bookname: string
    price: number | null
  },
  requester: {
    name: string | null
  }
}


export enum bookAvailavleStatus {
  AVAILABLE,
  GIVEN,
}
export enum GENRES {
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Sci-Fi",
  "Fantasy",
  "Romance",
  "Thriller",
  "Biography",
  "History",
  "Classic",
  "Contemporary",
  "Young Adult",
  "Children",
  "Self-Help",
}
// rent books route

interface RentBooksType {
  _id: string;
}

import { Prisma } from "@prisma/client";

export type roomTypeForCardWithName = Prisma.roomGetPayload<{
  include: {
    members: {
      include: {
        member: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;
