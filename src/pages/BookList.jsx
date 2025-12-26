import { useEffect } from "react";
import { FaBook, FaPen, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { deleteBook, viewBook } from "../features/bookSlice";
import { NavLink } from "react-router-dom";
import "../assets/css/card.css"


const BookList = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewBook())
  }, [dispatch])

  const { bookList } = useSelector(state => state)
  console.log(bookList)

  function trash(id) {
    // alert(id)
    if (confirm("do you want to delete this book?")) {
      dispatch(deleteBook(id))
    }
  }

  return (
    <>
      <div className="container my-5">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold d-flex align-items-center gap-2 mb-1">
              <FaBook className="text-warning" />
              Book Collection
            </h3>
            <p className="text-muted mb-0">
              {bookList.length} books available
            </p>
          </div>
        </div>

        {/* Empty State */}
        {bookList.length === 0 ? (
          <div className="text-center py-5 border rounded-4 shadow-sm bg-light">
            <FaBook size={60} className="text-secondary mb-3" />
            <h4 className="fw-bold">No books found</h4>
            <p className="text-muted mb-0">
              Start building your library by adding your first book
            </p>
          </div>
        ) : (

          <div className="row g-4">
            {bookList.map((book) => (
              <div className="col-lg-4 col-md-6" key={book.id}>
                <div className="card h-100 border-0 rounded-4 shadow book-card overflow-hidden">

                  {/* Accent Bar */}
                  <div className="bg-warning" style={{ height: "6px" }}></div>

                  <div className="card-body p-4 d-flex flex-column">

                    {/* Category */}
                    <span className="badge bg-light text-dark border rounded-pill px-3 py-1 align-self-start">
                      {book.category}
                    </span>

                    {/* Title */}
                    <h5 className="fw-bold mt-3">{book.title}</h5>

                    {/* Description */}
                    <p className="text-muted mt-2 flex-grow-1">
                      {book.description.length > 120
                        ? book.description.substring(0, 120) + "..."
                        : book.description}
                    </p>

                    {/* Footer Actions */}
                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                      <NavLink
                        to={`/updateBook/${book.id}`}
                        className="btn btn-sm btn-outline-primary rounded-pill px-3"
                      >
                        <FaPen className="me-1" />
                        Edit
                      </NavLink>

                      <button
                        onClick={() => trash(book.id)}
                        className="btn btn-sm btn-outline-danger rounded-pill px-3"
                      >
                        <FaTrash className="me-1" />
                        Delete
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


    </>
  )
}

export default BookList
