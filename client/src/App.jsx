import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Error from "./pages/Error"
import CreateStore from "./pages/CreateStore"
import Login from "./pages/Login"
import Store from "./pages/Store"
import AdminLogin from "./pages/AdminLogin"
function App() {

  return (
    <Router>
        <Nav/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/profile" element = {<Profile/>}/>
        <Route path="/sign-up" element = {<SignUp/>}/>
        <Route path="/login" element = {<Login/>}/>
        {/* <Route path="/create-store" element = {<CreateStore/>}/> */}
        <Route path="/admin" element = {<AdminLogin/>}/>
        <Route path="/store" element = {<Store/>} />
        <Route path="*" element = {<Error/>}/>
      </Routes>
    </Router>
  ) 
}

export default App
