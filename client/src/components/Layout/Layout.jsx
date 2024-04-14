import { Header } from "./Header/Header"
import { HomePage } from "./HomePage/HomePage"
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <Outlet />
    </div>
  )
}

export { Layout }
