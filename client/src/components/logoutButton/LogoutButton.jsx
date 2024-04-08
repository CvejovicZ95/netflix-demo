import {useLogout} from "../../hooks/useLogout"
import "./LogoutButton.css";

const Logout=()=>{
  const {logout} = useLogout()
  return(
    <div className="logout-div">
      <button onClick={logout} className="logout-button">Logout</button>
    </div>
  )
}

export {Logout}