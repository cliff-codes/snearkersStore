import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
function App() {

  return (
    <Router>
        <Nav/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/sign-up" element = {<SignUp/>}/>
      </Routes>
    </Router>
  ) 
}

export default App
