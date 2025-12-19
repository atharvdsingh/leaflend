import type { SerializableBook } from "@/app/types/bookstypeforRedux";
import type { booksHave } from "@prisma/client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BookstateType{
    myallBooks:SerializableBook[]
}

const initialState:BookstateType={
    myallBooks:[]
}

const Mybookslice=createSlice({
    name:"myBookslice",
    initialState,
    reducers:{
        setMyAllBooks:(state,action:PayloadAction<SerializableBook[]>)=>{
            state.myallBooks=action.payload
        },
        addNewMyBook:(state,action:PayloadAction<SerializableBook>)=>{
            state.myallBooks.push(action.payload)
        }
        ,
        removeBook:(state,action:PayloadAction<SerializableBook>)=>{
            state.myallBooks.splice(action.payload.id)

        }
    }
})


export const { setMyAllBooks, addNewMyBook } = Mybookslice.actions
export default Mybookslice.reducer