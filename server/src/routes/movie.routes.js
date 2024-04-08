import express from 'express'
import {uploadMovie,streamMovie,getMovieById} from '../controllers/movies.controller.js'

//import {protectRoute} from '../middleware/protectRoute.js'

const movieRouter=express.Router()

movieRouter.post('/movies',/*protectRoute,*/uploadMovie)
movieRouter.get('/stream/:title',streamMovie)
movieRouter.get('/movies/:id',getMovieById)

export  {movieRouter}