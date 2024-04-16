import React from "react";
import { useState, useEffect } from "react";
import { MoviesHeader } from "./MoviesHeader";
import { useGetMovies } from "../../hooks/useGetMovies";
import { useStartStreaming } from "../../hooks/useStartStreaming";
import videojs from "video.js";
import "./Movies.css";

const Movies = () => {
  const { movies } = useGetMovies();
  const { stream } = useStartStreaming();
  const [search, setSearch] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [showOtherMoviesButton, setShowOtherMoviesButton] = useState(false);

  const handlePlay = (movieId) => {
    stream(movieId);
    setIsPlaying(true);
    setShowOtherMoviesButton(true);
  };

  const handleOtherMovies = () => {
    setIsPlaying(false);
    setShowOtherMoviesButton(false);
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      movie.type.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (isPlaying) {
      const videoJsOptions = {
        controlBar: {
          progressControl: true,
          remainingTimeDisplay: false,
          durationDisplay: false,
          currentTimeDisplay: false,
          timeDivider: false,
        },
      };

      const videoElement = document.getElementById("my-video");
      const newPlayer = videojs(videoElement, videoJsOptions);

      setPlayer(newPlayer);
    } else {
      if (player) {
        player.dispose();
      }
    }

    return () => {
      if (player) {
        player.dispose();
      }
    };
    // eslint-disable-next-line
  }, [isPlaying]);

  return (
    <>
      {!isPlaying && (
        <MoviesHeader
          setSearch={setSearch}
          setShowOtherMoviesButton={setShowOtherMoviesButton}
        />
      )}
      {isPlaying && <video id="my-video" className="video-js" controls></video>}
      <div className="movies-list">
        {!isPlaying && showOtherMoviesButton ? (
          <button className="other-movies-button" onClick={handleOtherMovies}>
            Other Movies
          </button>
        ) : (
          <>
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <div key={movie._id} className="movie-container">
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    onClick={() => handlePlay(movie._id)}
                    className="movie-image"
                  />
                  <div className="movie-details">
                    <h3 className="movie-title">{movie.title}</h3>
                    <button
                      className="play-button"
                      onClick={() => handlePlay(movie._id)}
                    >
                      Play
                    </button>
                    <p className="movie-desc">{movie.description}</p>
                    <p className="movie-length">{movie.length}</p>
                    <p className="movie-type">{movie.type}</p>
                  </div>
                </div>
              ))
            ) : (
              <h1
                className="no-movies"
                style={{ color: "white", fontSize: "40px" }}
              >
                Lights, camera, no action! No movies found.
              </h1>
            )}
          </>
        )}
      </div>
    </>
  );
};

export { Movies };
