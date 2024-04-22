import express from "express";
import {
  uploadMovie,
  streamMovie,
  getMovieById,
} from "../controllers/movies.controller.js";

const movieRouter = express.Router();

movieRouter.post("/movies", uploadMovie);
movieRouter.get("/stream/:title", streamMovie);
movieRouter.get("/movies/:id", getMovieById);

export { movieRouter };
