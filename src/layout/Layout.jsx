import { lazy } from "react"

const BookForm = lazy(()=>import('../pages/BookForm'))
const BookList = lazy(()=>import('../pages/BookList'))


export const Layout = [
    {
        path:'/',
        element:BookList
    },
    {
        path:'/addBook',
        element:BookForm
    },
    {
        path:'/updateBook/:id',
        element:BookForm
    }

]