import { signInWithEmailAndPassword } from "firebase/auth"
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import {auth} from "../../firebase"
import { FaUserLock } from "react-icons/fa"
import "../assets/css/login.css"


const Login = () => {
  const { register, handleSubmit } = useForm()
  const redirect = useNavigate()

  function signin(data) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        localStorage.setItem('userId', user.user.uid)
        alert("login successfully")
        redirect("/")
      })
      .catch(err => alert(err))
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(signin)}
        className="login-card col-lg-5 col-md-7 mx-auto my-5 p-5"
      >

        {/* Header */}
        <div className="text-center mb-4">
          <FaUserLock size={40} className="text-primary mb-2" />
          <h3 className="fw-bold mb-1">Welcome Back</h3>
          <p className="text-muted small">Login to your account</p>
        </div>

        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            {...register("email")}
            className="form-control form-control-lg"
            placeholder="Email address"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            {...register("password")}
            className="form-control form-control-lg"
            placeholder="Password"
          />
        </div>

        {/* Actions */}
        <button className="btn btn-primary w-100 py-2 fw-semibold">
          Login
        </button>

        <div className="text-center mt-4">
          <span className="text-muted small">Don’t have an account?</span>
          <NavLink to="/register" className="ms-1 fw-semibold text-decoration-none">
            Register
          </NavLink>
        </div>

      </form>

    </>
  )
}

export default Login
