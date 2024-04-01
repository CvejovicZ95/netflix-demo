import express from 'express'
import {uploadMovie,streamMovie,getMovieById} from '../controllers/movies.controller.js'

const router=express.Router()

router.post('/movies',uploadMovie)
router.get('/stream/:title',streamMovie)
router.get('/movies/:id',getMovieById)

export default router