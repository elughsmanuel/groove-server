import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { 
    songSchema, 
    updateSongSchema,
} from '../../validators/musicSchema';
import ArtistService from '../services/artistService';
import UserRepository from '../../user/repositories/userRepository';
import ArtistRepository from '../repositories/artistRepository';

const userRepository = new UserRepository();
const artistRepository = new ArtistRepository();
const artistService = new ArtistService(userRepository, artistRepository);

export const addSong = async (
    req: Request & {userId?: number}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const schema = await songSchema.validateAsync(req.body);

        const addSong = await artistService.addSong(
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

        const songs = await artistService.getAllSongs(
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

        const song = await artistService.getSongById(
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

        const song = await artistService.updateSong(
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

        const deleteSong = await artistService.deleteSong(
            Number(req.userId),
            Number(songId),
        );

        return res.status(StatusCodes.OK).json(deleteSong);
    } catch (error) {
        next(error);
    }
};
