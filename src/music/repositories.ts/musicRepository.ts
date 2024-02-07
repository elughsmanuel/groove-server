import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MusicRepository {
    async addSong(userId: string, title: string, artist: string, album: string, genre: string, releaseYear: number, url: string, albumArt: string) {
        const music = await prisma.song.create({
            data: {
                userId: parseInt(userId, 10),
                title: title,
                artist: artist,
                album: album,
                genre: genre,
                releaseYear: releaseYear,
                url: url,
                albumArt: albumArt,
          }
        });

        return music;
    }
}

export default MusicRepository;
