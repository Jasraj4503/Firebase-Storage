import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

let userId = localStorage.getItem('userId')
export const addBook = createAsyncThunk('/addBook', async (data) => {
    try {
        const newData = { userId, ...data }
        addDoc(collection(db, 'book'), newData)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const viewBook = createAsyncThunk('/viewBook', async () => {
    try {
        const data = await getDocs(collection(db, 'book'))
        console.log(data)
        const arr = []
        data.forEach((doc) => {
            // console.log(doc.data())
            // console.log(doc.id)
            const newBook = {
                id: doc.id,
                ...doc.data()
            }
            console.log(newBook)
            arr.push(newBook)
        })
        const filterData = arr.filter(ele => ele.userId == userId)
        return filterData
    } catch (error) {
        console.log(error)

    }
})

export const deleteBook = createAsyncThunk('/deleteBook', async (id) => {
    // console.log(id)
    await deleteDoc(doc(db, `book/${id}`))
    return id
})

export const updateBook = createAsyncThunk('/updateBook', async (data) => {
    const { id } = data
    await updateDoc(doc(db, `book/${id}`, data))
    return data
})

const bookSlice = createSlice({
    name: 'books',
    initialState: {
        bookList: [],
        taskList: 0
    },

    ///// for local data or localStorage
    reducers: {},

    ///// for api or third party data
    extraReducers: (res) => {
        res
            .addCase(addBook.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.bookList.push(action.payload)
            })
            .addCase(viewBook.fulfilled, (state, action) => {
                state.bookList = action.payload
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                const { id } = action.payload
                const filterData = state.bookList.filter(ele => ele.id !== id)
                state.bookList = filterData
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                const { id } = action.payload
                const index = state.bookList.findIndex(book => book.id == id)
                if (index != -1) {
                    state.bookList[index] = action.payload
                }
            })

    }
})

export default bookSlice.reducer