import type { SerializableBook } from "@/types/bookstypeforRedux";
import type { booksHave } from "@prisma/client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BookstateType {
    myallBooks: SerializableBook[]
}

const initialState: BookstateType = {
    myallBooks: []
}

const Mybookslice = createSlice({
    name: "myBook",
    initialState,
    reducers: {
        setMyAllBooks: (state, action: PayloadAction<SerializableBook[]>) => {
            state.myallBooks = action.payload
        },
        addNewMyBook: (state, action: PayloadAction<SerializableBook>) => {
            state.myallBooks.push(action.payload)
        }
        ,
        removeMyBook: (state, action: PayloadAction<SerializableBook["id"]>) => {
            state.myallBooks = state.myallBooks.filter((book) => book.id != action.payload)

        },
        visibilityStatusChanged: (state, action: PayloadAction<number>) => {
            const book = state.myallBooks.find((b) => b.id === action.payload);
            if (book) {
                book.visibilityStatus = book.visibilityStatus === "HIDE" ? "SHOW" : "HIDE";
            }
        }
    }
})


export const { setMyAllBooks, addNewMyBook, removeMyBook, visibilityStatusChanged } = Mybookslice.actions
export default Mybookslice.reducer