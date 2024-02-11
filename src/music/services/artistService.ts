import UserRepository from '../../user/repositories/userRepository';
import ArtistRepository from '../repositories/artistRepository';
import BadRequest from '../../errors/BadRequest';
import {
    USER_NOT_FOUND,
    ARTIST_ADMIN_ALLOWED,
    SONG_NOT_FOUND,
    SONG_DELETED,
} from '../utils/constants';

class ArtistService {
    private userRepository: UserRepository;
    private artistRepository: ArtistRepository

    constructor(
        userRepository: UserRepository,
        artistRepository: ArtistRepository,
    ) {
        this.userRepository = userRepository;
        this.artistRepository = artistRepository;
    }

    async addSong(userId: number, title: string, artist: string, album: string, genre: string, releaseYear: number, url: string, albumArt: string) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const access = user.access;

        if(access !== 'artist' && access !== 'admin') {
            throw new BadRequest(ARTIST_ADMIN_ALLOWED);
        }

        const song = await this.artistRepository.addSong(
            userId,
            title,
            artist,
            album,
            genre,
            releaseYear,
            url,
            albumArt,
        );

        return { 
            success: true, 
            data: song,
        }
    }

    async getAllSongs(userId: number, page: any, perPage: any,) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const count = await this.artistRepository.getTotalSongCount(userId);

        // Calculate pagination values
        const skip = (page - 1) * perPage;
        const currentPage = Math.ceil(page);
        const totalPages = Math.ceil(count / perPage);

        const songs = await this.artistRepository.getAllSongs(userId, skip, perPage);


        return { 
            success: true, 
            data: songs,
            currentPage: currentPage,
            totalPages: totalPages,
        }
    }

    async getSongById(userId: number, songId: number) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const song = await this.artistRepository.getSongById(userId, songId);

        if(!song) {
            throw new BadRequest(SONG_NOT_FOUND);
        }

        return {
            status: true,
            data: song,
        }
    }

    async updateSong(userId: number, songId: number, data: any) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const songExist = await this.artistRepository.getSongById(userId, songId);

        if(!songExist) {
            throw new BadRequest(SONG_NOT_FOUND);
        }

        const song = await this.artistRepository.updateSong(userId, songId, data);

        return {
            status: true,
            data: song,
        }
    }

    async deleteSong(userId: number, songId: number) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const songExist = await this.artistRepository.getSongById(userId, songId);

        if(!songExist) {
            throw new BadRequest(SONG_NOT_FOUND);
        }

        await this.artistRepository.deleteSong(userId, songId);

        return {
            status: true,
            message: SONG_DELETED,
        }
    }
}

export default ArtistService;
