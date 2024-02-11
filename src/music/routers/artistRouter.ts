import express from 'express';
import { 
    authenticate, 
} from '../../middleware/authMiddleware';
import { 
    addSong,
    getAllSongs,
    getSongById,
    updateSong,
    deleteSong,
} from '../controllers/artistController';

const artistRouter = express.Router();

artistRouter.post('/add-song', authenticate, addSong);
artistRouter.get('/songs', authenticate, getAllSongs);
artistRouter.get('/get-song/:songId', authenticate, getSongById);
artistRouter.patch('/update-song/:songId', authenticate, updateSong);
artistRouter.delete('/delete-song/:songId', authenticate, deleteSong);

export default artistRouter;
