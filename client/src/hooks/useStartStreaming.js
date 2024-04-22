import { toast } from "react-toastify";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { fetchMovieData, getVideoPath } from "../api/netflixApi";

const playVideo = (videoPath) => {
  const videoPlayer = videojs("my-video", { controls: true });
  videoPlayer.src({
    src: videoPath,
    type: "video/mp4",
  });

  videoPlayer.on("fullscreenchange", function () {
    this.trigger("controlsenabled");
  });

  videoPlayer.ready(function () {
    // eslint-disable-next-line
    const controlBar = this.controlBar;
  });

  videoPlayer.load();
  videoPlayer.play();
};

export const useStartStreaming = () => {
  const stream = async (movieId) => {
    try {
      const movieData = await fetchMovieData(movieId);
      handleInputErrors({ movieId });

      const videoPath = getVideoPath(movieData.videoFolder);
      playVideo(videoPath);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { stream };
};

const handleInputErrors = ({ movieId }) => {
  if (!movieId) {
    throw new Error("Movie ID is required");
  }
};
