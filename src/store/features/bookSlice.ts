import type { booksHave } from "@prisma/client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BookstateType{
    allBooks:booksHave[]
}

const initialState:BookstateType={
    allBooks:[]
}

const bookSlice= createSlice({
    name:"Books",
    initialState,
    reducers:{
        setAllBooks:(state,action:PayloadAction<booksHave[]>)=>{
            state.allBooks=action.payload
        },
        addNewBook:(state,action:PayloadAction<booksHave>)=>{
            state.allBooks.push(action.payload)
        }
    }
})

export const { setAllBooks, addNewBook } = bookSlice.actions
export default bookSlice.reducer