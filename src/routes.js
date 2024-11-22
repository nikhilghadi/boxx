import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Database from "./pages/Database"
import RunBout from "./components/run_bouts/RunBout"
export default function AppRoutes() {
  return (
    <Routes> 
    <Route path="/" Component={Home}></Route>
    <Route path="/database" Component={Database}></Route>  
    <Route path="/run_bout" Component={RunBout}></Route>
    </Routes> 
  )
}