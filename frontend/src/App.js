import { BrowserRouter , Routes , Route } from "react-router-dom";
import "./App.css"
import Login from './components/login/Login'
import Signup from './components/signUp/SignUp'
import AllProblems from './components/allProblems/AllProblems'
import ProblemsPage from "./components/problemsPage/ProblemsPage";
import Navbar from "./components/navBar/Navbar";

function App() {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/problemset/all/" element={<AllProblems />} />
                <Route path="/problems/:pid/" element={<ProblemsPage  />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </BrowserRouter>
  )
}

export default App