import {  createSlice } from "@reduxjs/toolkit";

const initialState={
    name:"",
    routerAddress: "",
    chainselector: "",
}

const merchantSlice=createSlice({
    name:"merchant",
    initialState,
    reducers:{
        setMerchantValue : (state,action)=>{
            const data=action.payload
            console.log("In reducer ",data)
            state.chainselector=data.chainselector
            state.routerAddress=data.routerAddress
            state.name=data.name
        }
    },
})

export const {setMerchantValue}=merchantSlice.actions;
export default merchantSlice.reducer