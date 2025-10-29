import type { SerializableBook } from "@/app/types/bookstypeforRedux";
import type { booksHave } from "@prisma/client";
import type { Payload } from "@prisma/client/runtime/library";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState{
    NoOfBooks:number
    books:SerializableBook[]
}

const initialState:InitialState={
    NoOfBooks:0,
    books:[]
}

const cartSlice=createSlice({
    name:"Cart",
    initialState,
    reducers:{
        AddToCart: (state,action:PayloadAction<SerializableBook>)=>{

            if(!(state.books.find((book)=>book.id===action.payload.id))){

                state.NoOfBooks=state.NoOfBooks+1
                state.books.push(action.payload)
            }
        },
        RemoveFromCart:(state,action:PayloadAction<booksHave>)=>{
            state.NoOfBooks=state.NoOfBooks-1
             state.books=state.books.filter((book)=>book.id!=action.payload.id)

        }
    }
})


export const {AddToCart,RemoveFromCart} = cartSlice.actions
export default cartSlice.reducer




