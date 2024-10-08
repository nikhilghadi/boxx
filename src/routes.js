import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Database from "./pages/Database"
export default function AppRoutes() {
  return (
    <Routes> 
    <Route path="/" Component={Home}></Route>
    <Route path="/database" Component={Database}></Route>  
    </Routes> 
  )
}