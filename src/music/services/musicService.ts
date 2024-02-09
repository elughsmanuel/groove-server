import UserRepository from '../../user/repositories/userRepository';
import MusicRepository from '../repositories.ts/musicRepository';
import BadRequest from '../../errors/BadRequest';
import {
    USER_NOT_FOUND,
    ARTIST_ADMIN_ALLOWED,
} from '../utils/constants';

class MusicService {
    private userRepository: UserRepository;
    private musicRepository: MusicRepository

    constructor(
        userRepository: UserRepository,
        musicRepository: MusicRepository,
    ) {
        this.userRepository = userRepository;
        this.musicRepository = musicRepository;
    }

    async addSong(userId: string, title: string, artist: string, album: string, genre: string, releaseYear: number, url: string, albumArt: string) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const access = user.access;

        if(access !== 'artist' && access !== 'admin') {
            throw new BadRequest(ARTIST_ADMIN_ALLOWED);
        }

        const music = await this.musicRepository.addSong(
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
            data: music,
        }
    }

    async getAllSongs(userId: string, page: any, perPage: any,) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const count = await this.musicRepository.getTotalSongCount(userId);

        // Calculate pagination values
        const skip = (page - 1) * perPage;
        const currentPage = Math.ceil(page);
        const totalPages = Math.ceil(count / perPage);

        const songs = await this.musicRepository.getAllSongs(userId, skip, perPage);


        return { 
            success: true, 
            data: songs,
            currentPage: currentPage,
            totalPages: totalPages,
        }
    }


}

export default MusicService;
