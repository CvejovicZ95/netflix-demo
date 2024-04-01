import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const useUpload = () => {
  const [uploaded, setUploaded] = useState(false)
  const [loading,setLoading]=useState(false)
  const upload = async ({ title, description, length, type, imageUrl, category, videoFolder }) => {
    const success = handleInputErrors({ title, description, length, type, imageUrl, category })
    if (!success) return;

    setLoading(true)
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('length', length);
      formData.append('type', type);
      formData.append('imageUrl', imageUrl);
      formData.append('category', category);
      formData.append('video', videoFolder);

      const res = await fetch('http://localhost:4500/api/movies', {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      setUploaded(true);
    } catch (error) {
      toast.error(error.message);
      setUploaded(false);
    }finally{
      setLoading(false)
    }
  }

  return { loading,uploaded, upload }
}

export default useUpload;

function handleInputErrors({ title, description, length, type, imageUrl, category }) {
  if (!title || !description || !length || !type || !imageUrl || !category) {
    toast.error('Please fill in all fields');
    return false;
  }
  return true;
}
