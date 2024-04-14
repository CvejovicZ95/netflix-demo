import {Header} from "../Layout/Header/Header"
import {HomePage} from "../Layout/HomePage/HomePage"
import { Outlet } from 'react-router-dom';

const Layout=()=>{
  return(
    <div className="App">
      <Header/>
      <HomePage/>
      <Outlet/>
    </div>
  )
}

export {Layout}