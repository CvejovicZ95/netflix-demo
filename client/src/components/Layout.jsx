import Header from "./Header";
import HomePage from "./HomePage";
import { Outlet } from 'react-router-dom';

const Layout=()=>{
  return(
    <div className="App">
      <Header tittle/>
      <HomePage/>
      <Outlet/>
    </div>
  )
}

export default Layout