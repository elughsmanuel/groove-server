import express from 'express';
import { 
    authenticate, 
} from '../../middleware/authMiddleware';
import { 
    addSong,
    getAllSongs,
} from '../controllers/musicController';

const musicRouter = express.Router();

musicRouter.post('/add-song', authenticate, addSong);
musicRouter.get('/songs', authenticate, getAllSongs);

export default musicRouter;
