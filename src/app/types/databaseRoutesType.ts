export interface CreateBookType {
  bookname: string;
  cover: string;
  author: string;
  genres: GENRES;
  price: number;
  status: bookAvailavleStatus;
}
export interface AllBooksType{
    id:number,
    bookname:string,
    cover:string,
    publishDate:Date,
    ownerId:number,
    status:bookAvailavleStatus
    genres:GENRES
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
