import {useEffect,useState} from 'react'
import { toast } from 'react-toastify';
import { fetchMovies } from '../api/netflixApi';

const useGetMovies=()=>{
  const [movies,setMovies]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    const getMovies=async()=>{
      setLoading(true)
      try{
        const moviesData = await fetchMovies();
        setMovies(moviesData);
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