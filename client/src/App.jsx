import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import SearchBar from "./components/SearchBar"
import { Container } from "@mui/material"
function App() {

  return (
    <Router>
        <Nav/>
        <Container>
          <SearchBar/>
        </Container>
      <Routes>
        <Route element = {<Home/>}/>
      </Routes>
    </Router>
  ) 
}

export default App
