import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { connect } from './src/db/connetDB.js'
import { authRouter } from './src/routes/auth.routes.js'
import { homePageLogin } from './src/controllers/auth.controller.js'
import { getMovies } from './src/controllers/movies.controller.js'
import { movieRouter } from './src/routes/movie.routes.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.post('/', homePageLogin)
app.get('/api/movies', getMovies)

app.use('/api/auth', authRouter)
app.use('/api', movieRouter)

app.listen(PORT, () => {
  connect()
  console.log(`Server is listening on port ${PORT}`)
})
