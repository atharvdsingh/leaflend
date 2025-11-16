import type { SerializableBook } from "@/app/types/bookstypeforRedux";
import type { booksHave } from "@prisma/client";
import type { Payload } from "@prisma/client/runtime/library";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ManageLocalStorage } from "@/util/managingTheLocalStorage";

const localStorageInstance= ManageLocalStorage.ReturnInstance()

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
        hydrateCart:(state,action:PayloadAction<SerializableBook[]>)=>{
            state.NoOfBooks=action.payload.length
            state.books=action.payload
        },
        AddToCart: (state,action:PayloadAction<SerializableBook>)=>{

            if(!(state.books.find((book)=>book.id===action.payload.id))){

                state.NoOfBooks=state.NoOfBooks+1
                state.books.push(action.payload)
                localStorageInstance.addedToTheStorage(action.payload)
            }
        },
        RemoveFromCart:(state,action:PayloadAction<SerializableBook>)=>{
            state.NoOfBooks=state.NoOfBooks-1
            state.books=state.books.filter((book)=>book.id!=action.payload.id)
            localStorageInstance.removeBook(action.payload)
        }
    }
})


export const {AddToCart,RemoveFromCart,hydrateCart} = cartSlice.actions
export default cartSlice.reducer




