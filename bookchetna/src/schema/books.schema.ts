import z, { file, number } from "zod"
import { booksHave, BookType } from "@prisma/client"

export const createBookSchema=z.object({
    bookname:z.string().min(2,"book name is required"),
    author:z.string().optional(),
    status:z.string().optional(),
    price:z.number().int().optional(),
    description: z.string().optional(),
    
    roomId:z.number().min(5,"room id is required"),
    bookType:z.enum(BookType),
    cover:z.instanceof(File,{
        message:"image is missing"
    })
    
})

export type createBookType=z.infer<typeof createBookSchema>