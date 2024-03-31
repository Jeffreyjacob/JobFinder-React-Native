import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
    job:[]
}

export const SavedjobSlice = createSlice({
    name:'job',
    initialState,

    reducers:{
       GetSavedJob:(state,action)=>{
          state.job = action.payload
       }
    }
})


export const {GetSavedJob} = SavedjobSlice.actions;
export const SelectSavedJob = (state:any)=> state.SavedJob.job;
export default SavedjobSlice.reducer;