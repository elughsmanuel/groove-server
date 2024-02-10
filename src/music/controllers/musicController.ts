import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { 
    songSchema, 
    updateSongSchema,
} from '../../validators/musicSchema';
import MusicService from '../services/musicService';
import UserRepository from '../../user/repositories/userRepository';
import MusicRepository from '../repositories.ts/musicRepository';

const userRepository = new UserRepository();
const musicRepository = new MusicRepository();
const musicService = new MusicService(userRepository, musicRepository);

export const addSong = async (
    req: Request & {userId?: number}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const schema = await songSchema.validateAsync(req.body);

        const addSong = await musicService.addSong(
            Number(req.userId),
            schema.title,
            schema.artist,
            schema.album,
            schema.genre,
            schema.releaseYear,
            schema.url,
            schema.albumArt,
        );

        return res.status(StatusCodes.CREATED).json(addSong);
    } catch (error) {
        next(error);
    }
};

export const getAllSongs = async (
    req: Request & {userId?: number}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { 
            page,
            perPage,
        } = req.query;

        const songs = await musicService.getAllSongs(
            Number(req.userId),
            parseFloat(page as string) || '1',
            parseFloat(perPage as string || '10'),
        );

        return res.status(StatusCodes.OK).json(songs);
    } catch (error) {
        next(error);
    }
};

export const getSongById = async (
    req: Request & {userId?: number}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { songId } = req.params;

        const song = await musicService.getSongById(
            Number(req.userId),
            Number(songId),
        );

        return res.status(StatusCodes.OK).json(song);
    } catch (error) {
        next(error);
    }
};

export const updateSong = async (
    req: Request & {userId?: number}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { songId } = req.params;

        const schema = await updateSongSchema.validateAsync(req.body);

        const song = await musicService.updateSong(
            Number(req.userId),
            Number(songId),
            schema,
        );

        return res.status(StatusCodes.OK).json(song);
    } catch (error) {
        next(error);
    }
};

export const deleteSong = async (
    req: Request & {userId?: number}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { songId } = req.params;

        const deleteSong = await musicService.deleteSong(
            Number(req.userId),
            Number(songId),
        );

        return res.status(StatusCodes.OK).json(deleteSong);
    } catch (error) {
        next(error);
    }
};
