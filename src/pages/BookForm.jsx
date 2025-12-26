import { useForm } from "react-hook-form"
import { FaBook } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { addBook, updateBook, viewBook } from "../features/bookSlice"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

const BookForm = () => {

  const { register, handleSubmit, reset } = useForm()

  const { id } = useParams()

  const dispatch = useDispatch()

  const {bookList} = useSelector(state=>state)

  const redirect = useNavigate()
  
  function Add(data) {
    id==null ?
    dispatch(addBook(data))
    :
    dispatch(updateBook(data))
    reset()
    redirect('/')
  } 

  useEffect(() => {
    if(id==null){
      reset({
        title:"",
        category:"",
        description:""
      })
    }else{
      dispatch(viewBook())
      const singleBook = bookList.find(book => book.id == id)
      reset(singleBook)
    }
  },[dispatch, reset, id])

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0">
              <div className={`card-header ${id == null ? "bg-primary" : "bg-warning"} text-dark py-3`}>
                <h3 className="mb-0 d-flex align-items-center gap-2">
                  <FaBook size={24} />
                  {id == null ? "Add New Book" : "Update Book"}
                </h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(Add)}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">Book Title</label>
                    <input type="text" {...register('title')} className="form-control" placeholder="Enter book title" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label fw-bold">Category</label>
                    <select  {...register('category')} className="form-select border-2">
                      <option value="">Select a category</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Non-Fiction">Non-Fiction</option>
                      <option value="Science">Science</option>
                      <option value="Technology">Technology</option>
                      <option value="History">History</option>
                      <option value="Biography">Biography</option>
                      <option value="Self-Help">Self-Help</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">Description</label>
                    <textarea  {...register('description')} className="form-control border-2" rows="4" placeholder="Enter book description" />
                  </div>

                  <button type="submit" className={`btn ${id == null ? "btn-primary" : "btn-warning"} btn-lg w-100 fw-bold`}>{id == null ? "Add Book" : "Update Book"}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookForm
