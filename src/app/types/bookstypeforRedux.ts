// types/BookTypes.ts
import type { booksHave } from "@prisma/client"

export type SerializableBook = Omit<booksHave, "publishDate"> & {
  publishDate: string
}
