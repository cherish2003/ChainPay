import { configureStore } from "@reduxjs/toolkit";
import merchantSliceReducer from "./slices/merchantSlice"

const store = configureStore({
  reducer: {
    merchant:merchantSliceReducer
  },
});

export default store;