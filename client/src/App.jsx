import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Help from "./components/Help";
import Movies from "./components/Movies";
import Upload from './components/Upload'
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

export default App;
