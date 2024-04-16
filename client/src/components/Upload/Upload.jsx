import {Logo} from "../Logo/Logo.jsx"
import {Logout} from "../LogoutButton/LogoutButton"
import { useState } from "react"
import {useUpload} from "../../hooks/useUpload"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom"
import { MdUpload } from "react-icons/md";
import "./Upload.css";

const Upload=()=>{

  const [inputs,setInputs]=useState({
    title:'',
    description:'',
    length:'',
    type:'',
    imageUrl:'',
    category:'',
    videoFolder:''
  })

  const {loading,uploaded,upload}=useUpload()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await upload(inputs)
  }


  return(
    <div>
      <div className="uploadHeader">
        <Logo/>
        <Logout/>
      </div>
      <div>
        <form className="uploadForm" onSubmit={handleSubmit}>
          <label className="custom-file-label" htmlFor="video">Choose video:</label>
          <input
            className="file-input" 
            type="file" 
            name="video" 
            id="video" 
            accept="video/*" 
            onChange={(e) => setInputs({ ...inputs, videoFolder: e.target.files[0] })}
            required
          />
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title"
            name="title"
            value={inputs.title}
            onChange={(e)=>setInputs({...inputs,title:e.target.value})} 
          />
          
          <label htmlFor="description">Description:</label>
          <textarea 
            type="text" 
            id="description"
            name="description"
            value={inputs.description}
            onChange={(e)=>setInputs({...inputs,description:e.target.value})} 
          />

          <label htmlFor="length">Length:</label>
          <input 
            type="text"  
            id="length"
            name="length"
            value={inputs.length}
            onChange={(e)=>setInputs({...inputs,length:e.target.value})} 
          />

          <label htmlFor="type">Type:</label>
          <input 
            type="text" 
            id="type"
            name="type"
            value={inputs.type}
            onChange={(e)=>setInputs({...inputs,type:e.target.value})} 
            
          />

          <label htmlFor="imgUrl">Image URL:</label>
          <input 
            type="text"  
            id="imgUrl"
            name="ImageUrl"
            value={inputs.imageUrl}
            onChange={(e)=>setInputs({...inputs,imageUrl:e.target.value})}
             
          />

          <label htmlFor="category">Category:</label>
          <input 
            type="text" 
            id="category"
            name="categoty"
            value={inputs.category}
            onChange={(e)=>setInputs({...inputs,category:e.target.value})}
             
          />

          <div className="upload-div">
            <button type="submit">Upload</button>
            
            {loading &&<h1 style={{color:'white'}}>The movie is uploading, please wait. <MdUpload /></h1>}
            {uploaded && <Navigate to={'/movies'}/>}
            {!uploaded && <p>Error while upload</p>}
          </div>
          <ToastContainer/>
        </form>
      </div>
    </div>
  )
}

export {Upload}