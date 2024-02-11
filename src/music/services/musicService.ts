import UserRepository from '../../user/repositories/userRepository';
import MusicRepository from '../repositories/musicRepository';
import BadRequest from '../../errors/BadRequest';
import {
    USER_NOT_FOUND,
    SONG_NOT_FOUND,
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

    async getAllSongs(page: any, perPage: any,) {
        const count = await this.musicRepository.getTotalSongCount();

        // Calculate pagination values
        const skip = (page - 1) * perPage;
        const currentPage = Math.ceil(page);
        const totalPages = Math.ceil(count / perPage);

        const songs = await this.musicRepository.getAllSongs(skip, perPage);


        return { 
            success: true, 
            data: songs,
            currentPage: currentPage,
            totalPages: totalPages,
        }
    }

    async getSongById(songId: number) {
        const song = await this.musicRepository.getSongById(songId);

        if(!song) {
            throw new BadRequest(SONG_NOT_FOUND);
        }

        return {
            status: true,
            data: song,
        }
    }
}

export default MusicService;
