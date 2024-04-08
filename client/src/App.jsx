import {Layout} from "./components/Layout/Layout"
import {Login} from "./components/login/Login"
import {Register} from "./components/register/Register"
import {Help} from "./components/help/Help"
import {Movies} from "./components/movies/Movies"
import {Upload} from "./components/uploadMovie/Upload"
import {Route,Routes,Navigate} from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'

function App() {
  const {authUser}=useAuthContext()
  return (
    <Routes>
      <Route path="/" element={<Layout/>}/>

      <Route path='login' element={authUser ? <Navigate to={'/movies'}/> : <Login/>}/>
      
      <Route path='register' element={<Register/>}/>
      
      <Route path='help' element={<Help/>}/>

      <Route path='movies' element={authUser ? <Movies/> : <Navigate to={'/login'}/>}/>
      
      <Route path='upload'element={authUser ? <Upload/> : <Navigate to={'/login'}/>}/>
      
    </Routes>
  );
}

export {App};
