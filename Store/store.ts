import { configureStore } from '@reduxjs/toolkit';
import SavedjobSliceReducer from './Feature/SavedjobSlice';

export const Store = configureStore({
    reducer:{
      SavedJob:SavedjobSliceReducer,  
    }
  });