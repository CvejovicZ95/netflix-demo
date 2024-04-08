import {useEffect,useState} from 'react'
import { toast } from 'react-toastify';

const useGetMovies=()=>{
  const [movies,setMovies]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    const getMovies=async()=>{
      setLoading(true)
      try{
        const res = await fetch('http://localhost:4500/api/movies')
        const data= await res.json()
        if(data.error){
          throw new Error(data.error)
        }
        setMovies(data)
      }catch(error){
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }
    getMovies()
  },[])

  return {loading,movies}
}

export {useGetMovies}