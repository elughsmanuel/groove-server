import UserRepository from '../../user/repositories/userRepository';
import MusicRepository from '../repositories.ts/musicRepository';
import BadRequest from '../../errors/BadRequest';
import {
    USER_NOT_FOUND,
    LISTENERS_NOT_ALLOWED,
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

        if(access === 'listener') {
            throw new BadRequest(LISTENERS_NOT_ALLOWED);
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
}

export default MusicService;
