import { configureStore } from "@reduxjs/toolkit";
import bookSlice from './bookSlice'
const store = configureStore({
    reducer:bookSlice
})

export default store