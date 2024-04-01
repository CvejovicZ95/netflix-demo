import express from 'express'
import connect from './db/connetDB.js';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js'
import { homePageLogin } from './controllers/auth.controller.js';
import { getMovies } from './controllers/movies.controller.js';
import movieRoutes from './routes/movie.routes.js'
import cors from 'cors'

const app=express()
const PORT=4500;
const corsOptions={
  origin:'http://localhost:3000',
  optionsSuccessStatus:200,
};

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.post('/', homePageLogin)
app.get('/api/movies',getMovies)

app.use('/api/auth',authRoutes)
app.use('/api',movieRoutes)


app.listen(PORT,()=>{
  connect();
  console.log(`Server is listening on port ${PORT}`)
})


//video player on second stream, need to fix bug

//FIXED!!!