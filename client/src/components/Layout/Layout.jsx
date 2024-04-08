import {Header} from "../Layout/header/Header"
import {HomePage} from "../Layout//homePage/HomePage"
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