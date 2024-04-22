import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { uploadMovie } from "../api/netflixApi";

export const useUpload = () => {
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const upload = async ({
    title,
    description,
    length,
    type,
    imageUrl,
    category,
    videoFolder,
  }) => {
    const success = handleInputErrors({
      title,
      description,
      length,
      type,
      imageUrl,
      category,
    });
    if (!success) return;

    setLoading(true);
    try {
      await uploadMovie({
        title,
        description,
        length,
        type,
        imageUrl,
        category,
        videoFolder,
      });
      setUploaded(true);
    } catch (error) {
      toast.error(error.message);
      setUploaded(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, uploaded, upload };
};

function handleInputErrors({
  title,
  description,
  length,
  type,
  imageUrl,
  category,
}) {
  return !title || !description || !length || !type || !imageUrl || !category
    ? (toast.error("Please fill in all fields"), false)
    : true;
}
