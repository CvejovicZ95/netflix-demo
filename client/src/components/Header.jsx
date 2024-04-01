import { Link } from "react-router-dom"
import Logo from "./Logo"

const Header=()=>{
  return(
    <header className="header">
      <Logo/>
      <Link to="/login" className="signButton">Sign in</Link>
    </header>
  )
}

export default Header