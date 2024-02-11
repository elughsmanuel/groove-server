import express from 'express';
import { 
    getAllSongs,
    getSongById,
} from '../controllers/musicController';

const musicRouter = express.Router();

musicRouter.get('/songs', getAllSongs);
musicRouter.get('/get-song/:songId', getSongById);

export default musicRouter;
