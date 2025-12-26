import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./layout/Navbar"
import { Layout } from "./layout/Layout"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import PrivateRoute from "./layout/PrivateRoute"
import Login from "./pages/Login"
import Signup from "./pages/Signup"


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute/>}>
            {
              Layout.map((ele) => (
                <Route path={ele.path} element={<ele.element />} />
              ))
            }
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Signup/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
