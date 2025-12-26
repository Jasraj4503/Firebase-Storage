import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import {auth} from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { FaUserPlus } from "react-icons/fa"
import "../assets/css/signup.css"


const Signup = () => {
    const { register, handleSubmit } = useForm()
    const redirect = useNavigate()

    function regist(data) {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((user) => {
                localStorage.setItem('userId', user.user.uid)
                // console.log(user)
                redirect('/login')
            })
            .catch(err => alert(err))
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(regist)}
                className="register-card col-lg-5 col-md-7 mx-auto my-5 p-5"
            >

                {/* Header */}
                <div className="text-center mb-4">
                    <FaUserPlus size={40} className="text-success mb-2" />
                    <h3 className="fw-bold mb-1">Create Account</h3>
                    <p className="text-muted small">
                        Sign up to start managing your books
                    </p>
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

                {/* Button */}
                <button className="btn btn-success w-100 py-2 fw-semibold">
                    Sign Up
                </button>

                {/* Footer */}
                <div className="text-center mt-4">
                    <span className="text-muted small">Already have an account?</span>
                    <NavLink
                        to="/login"
                        className="ms-1 fw-semibold text-decoration-none"
                    >
                        Login
                    </NavLink>
                </div>

            </form>

        </>
    )
}

export default Signup
