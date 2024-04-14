import { Link } from "react-router-dom"
import {Logo} from "../Logo/Logo"
import { useState } from "react"
import {useRegister} from "../../hooks/useRegister"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { BiCameraMovie } from "react-icons/bi";
import "./Register.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });

  
  const { registration,register } = useRegister()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await register(inputs)
  }

  return (
    <div>
      <Logo />
      <form className="registerForm" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          type="email"
          placeholder="Email address"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={inputs.confirmPassword}
          onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={inputs.phoneNumber}
          onChange={(e) => setInputs({ ...inputs, phoneNumber: e.target.value })}
        />
        <button type="submit">Register</button>

        {registration && <p style={{color:'white'}}>Registration successfull</p>}

        <ToastContainer/>
        
        {!registration && <p>Already registered?<Link className="signLink" to='/login'><span> Sign in now.</span></Link></p>}

        {registration && (
          <div className="camera-div">
            <Link className="signLink" to='/movies'>
                <span className="explore-text">Explore Movies</span>
                <span className="camera"><BiCameraMovie/></span>
            </Link>
          </div>
        )}

        <p className="captcha">This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
      </form>
    </div>
  )
}

export {Register}
