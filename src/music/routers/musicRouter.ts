import express from 'express';
import { 
    authenticate, 
} from '../../middleware/authMiddleware';
import { 
    addSong,
    getAllSongs,
    getSongById,
    updateSong,
} from '../controllers/musicController';

const musicRouter = express.Router();

musicRouter.post('/add-song', authenticate, addSong);
musicRouter.get('/songs', authenticate, getAllSongs);
musicRouter.get('/get-song/:songId', authenticate, getSongById);
musicRouter.patch('/update-song/:songId', authenticate, updateSong);

export default musicRouter;
