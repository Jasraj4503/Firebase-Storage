import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaPlus } from "react-icons/fa";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import "../assets/css/Navbar.css"

const Navbar = () => {


  const [isAuth, setAuth] = useState(null)
  const redirect = useNavigate()

  const signup = () => {

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem('userId', result.user.uid)
        alert("signup sucessfully")
        // console.log(result)
        redirect('/')

      })
      .catch(err => console.log(err))
  }

  /////get user login or not
  function ShowAuth() {
    onAuthStateChanged(auth, (user) => {
      // console.log(user)
      setAuth(user)
    })
  }
  useEffect(() => {
    ShowAuth()
  }, [auth])


  function logout() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('userId')
        alert("user logout")
        redirect('/login')
      })
      .catch(err => console.log(err))
  }

  // console.log(isAuth)


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient px-4 py-3 shadow-lg">
      <div className="container-fluid">

        {/* Logo */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center gap-2 text-warning"
          to="/"
        >
          <FaBook size={24} />
          <span className="fs-5">BookStore</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <ul className="navbar-nav align-items-center gap-3 mt-3 mt-lg-0">

            {isAuth ? (
              <>
                {/* Books */}
                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold px-3 rounded-pill hover-bg"
                    to="/"
                  >
                    Books
                  </Link>
                </li>

                {/* Add Book */}
                <li className="nav-item">
                  <Link
                    to="/addBook"
                    className="btn btn-warning fw-semibold px-4 py-2 rounded-pill d-flex align-items-center gap-2 shadow-sm"
                  >
                    <FaPlus size={14} />
                    Add Book
                  </Link>
                </li>

                {/* Profile */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle p-0"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={isAuth.photoURL}
                      alt="profile"
                      className="rounded-circle border border-2 border-warning"
                      width="42"
                      height="42"
                    />
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end shadow-lg p-3 rounded-4">
                    <li className="fw-semibold">{isAuth.displayName}</li>
                    <li className="text-muted small">{isAuth.email}</li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        onClick={logout}
                        className="btn btn-outline-danger btn-sm w-100 rounded-pill"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  onClick={signup}
                  className="btn btn-warning fw-semibold px-4 py-2 rounded-pill shadow"
                >
                  Sign in with Google
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>


  );
};

export default Navbar;
