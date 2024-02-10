import { Prisma, PrismaClient } from "@prisma/client";

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

    async getTotalSongCount(userId: string) {
        const count = await prisma.song.count({
            where: {
                userId: parseInt(userId, 10),
            },
        });
      
        return count;
    }

    async getAllSongs(userId: string, skip: any, perPage: any) {
        const query: Prisma.SongWhereInput = {};
      
        if (userId) {
            query.userId = parseInt(userId, 10);
        }
      
        const songs = await prisma.song.findMany({
            where: query,
            skip: parseInt(skip, 10) || undefined,
            take: parseInt(perPage, 10) || undefined,
        });
      
        return songs;
    }

    async getSongById(userId: string, songId: number) {
        const song = await prisma.song.findUnique({
          where: {
            userId: parseInt(userId, 10),
            id: songId,
          },
        });
      
        return song;
    }

    async updateSong(userId: string, songId: number, data: any) {
        const song = await prisma.song.update({
          where: {
            userId: parseInt(userId, 10),
            id: songId,
          },
          data: {
            ...data,
          },
        });
      
        return song;
    }

    async deleteSong(userId: string, songId: number) {
        const song = await prisma.song.delete({
          where: {
            userId: parseInt(userId, 10),
            id: songId,
          }
        });
      
        return song;
    }
}

export default MusicRepository;
