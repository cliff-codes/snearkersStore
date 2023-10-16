import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./pages/Home"
function App() {

  return (
    <Router>
        <Nav/>
      <Routes>
        <Route element = {<Home/>}/>
      </Routes>
    </Router>
  ) 
}

export default App
