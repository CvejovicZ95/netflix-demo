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
      const movieFolder = encodeURIComponent(movieData.videoFolder)
      const videoPath = `http://localhost:4500/api/stream/${movieFolder}`;

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
