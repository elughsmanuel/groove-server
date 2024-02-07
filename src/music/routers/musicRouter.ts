import express from 'express';
import { 
    authenticate, 
} from '../../middleware/authMiddleware';
import { 
    addSong,
} from '../controllers/musicController';

const musicRouter = express.Router();

musicRouter.post('/add-song', authenticate, addSong);

export default musicRouter;
