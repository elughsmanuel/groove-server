import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { 
    songSchema, 
} from '../../validators/musicSchema';
import MusicService from '../services/musicService';
import UserRepository from '../../user/repositories/userRepository';
import MusicRepository from '../repositories.ts/musicRepository';

const userRepository = new UserRepository();
const musicRepository = new MusicRepository();
const musicService = new MusicService(userRepository, musicRepository);

export const addSong = async (
    req: Request & {userId?: string}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const schema = await songSchema.validateAsync(req.body);

        const addSong = await musicService.addSong(
            String(req.userId),
            schema.title,
            schema.artist,
            schema.album,
            schema.genre,
            schema.releaseYear,
            schema.url,
            schema.albumArt,
        );

        return res.status(StatusCodes.OK).json(addSong);
    } catch (error) {
        next(error);
    }
};
