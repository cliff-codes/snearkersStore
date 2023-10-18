import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Error from "./pages/Error"
function App() {

  return (
    <Router>
        <Nav/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/profile" element = {<Profile/>}/>
        <Route path="/sign-up" element = {<SignUp/>}/>
        <Route path="*" element = {<Error/>}/>
      </Routes>
    </Router>
  ) 
}

export default App
