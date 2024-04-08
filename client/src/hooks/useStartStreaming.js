import { toast } from 'react-toastify';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const useStartStreaming = () => {
  const stream = async (movieId) => {
    const success = handleInputErrors({ movieId });
    if (!success) return;

    try {
      const res = await fetch(`http://localhost:4500/api/movies/${movieId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch movie data');
      }

      const movieData = await res.json();
      //console.log(movieData)
      const movieFolder = encodeURIComponent(movieData.videoFolder)
      //console.log(movieFolder)
      const videoPath = `http://localhost:4500/api/stream/${movieFolder}`;
      //console.log(videoPath)

      const videoPlayer = videojs('my-video', { controls: true });

      videoPlayer.src({
        src: videoPath,
        type: 'video/mp4'
      });

      videoPlayer.on('fullscreenchange', function() {
        this.trigger('controlsenabled');
      });

      videoPlayer.ready(function() {
        const controlBar = this.controlBar;
        console.log(controlBar);
      });

      videoPlayer.load();
      videoPlayer.play();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { stream };
};

function handleInputErrors({ movieId }) {
  if (!movieId) {
    toast.error('Error');
    return false;
  }
  return true;
}

export {useStartStreaming}
