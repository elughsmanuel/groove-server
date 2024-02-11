import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import MusicService from '../services/musicService';
import UserRepository from '../../user/repositories/userRepository';
import MusicRepository from '../repositories/musicRepository';

const userRepository = new UserRepository();
const musicRepository = new MusicRepository();
const musicService = new MusicService(userRepository, musicRepository);

export const getAllSongs = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { 
            page,
            perPage,
        } = req.query;

        const songs = await musicService.getAllSongs(
            parseFloat(page as string) || '1',
            parseFloat(perPage as string || '10'),
        );

        return res.status(StatusCodes.OK).json(songs);
    } catch (error) {
        next(error);
    }
};

export const getSongById = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { songId } = req.params;

        const song = await musicService.getSongById(
            Number(songId),
        );

        return res.status(StatusCodes.OK).json(song);
    } catch (error) {
        next(error);
    }
};
