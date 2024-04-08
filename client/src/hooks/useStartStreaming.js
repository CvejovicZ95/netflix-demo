import { toast } from 'react-toastify';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const fetchData = async (movieId) => {
  try {
    const res = await fetch(`http://localhost:4500/api/movies/${movieId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch movie data');
    }
    return await res.json();
  } catch (error) {
    throw new Error('Failed to fetch movie data');
  }
};

const playVideo = (videoPath) => {
  const videoPlayer = videojs('my-video', { controls: true });
  videoPlayer.src({
    src: videoPath,
    type: 'video/mp4'
  });

  videoPlayer.on('fullscreenchange', function() {
    this.trigger('controlsenabled');
  });

  videoPlayer.ready(function() {
    // eslint-disable-next-line
    const controlBar = this.controlBar;
  });

  videoPlayer.load();
  videoPlayer.play();
};

const useStartStreaming = () => {
  const stream = async (movieId) => {
    try {
      const movieData = await fetchData(movieId);
      handleInputErrors({ movieId });

      const movieFolder = encodeURIComponent(movieData.videoFolder);
      const videoPath = `http://localhost:4500/api/stream/${movieFolder}`;
      playVideo(videoPath);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { stream };
};

export { useStartStreaming };


const handleInputErrors = ({ movieId }) => {
  if (!movieId) {
    throw new Error('Movie ID is required');
  }
};
