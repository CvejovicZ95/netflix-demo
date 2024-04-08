import Movie from '../models/movieSchema.js'
import path from 'path';
import fs from 'fs';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

export const uploadMovie = async (req, res) => {
  try {
    upload.single('video')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading video:', err);
        return res.status(500).send('Server error: ' + err.message);
      }

      const { title, description, length, type, imageUrl, category } = req.body;
      const movieTitle = title ? title : 'unknown';

      const videoFolder = path.join('..', 'videos', movieTitle);

      if (!fs.existsSync(videoFolder)) {
        fs.mkdirSync(videoFolder, { recursive: true });
      }

      const videoPath = path.join(videoFolder, 'video.mp4');
      fs.writeFileSync(videoPath, req.file.buffer);

      const newMovie = new Movie({
        title,
        description,
        length,
        type,
        imageUrl,
        category,
        videoFolder: movieTitle
      });

      await newMovie.save();
      
      res.status(200).json({ message: 'Video uploaded successfully' });
    });
  } catch (error) {
    console.error('Error in movie controller', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const getMovies=async(req,res)=>{
  try{
    const allMovies=await Movie.find()
    res.status(200).json(allMovies)
  }catch(error){
    console.error('Error in getmovie controller', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch(error) {
    console.error('Error in get movie controller', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export const streamMovie = async (req, res) => {
  try {
    const { title } = req.params; 
    const videoPath = path.join('..', 'videos', title, 'video.mp4'); // 

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
  
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
  
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch(error) {
    console.error('Error in movie controller', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
