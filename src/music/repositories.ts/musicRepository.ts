import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MusicRepository {
    async addSong(userId: number, title: string, artist: string, album: string, genre: string, releaseYear: number, url: string, albumArt: string) {
        const music = await prisma.song.create({
            data: {
                userId: userId,
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

    async getTotalSongCount(userId: number) {
        const count = await prisma.song.count({
            where: {
                userId: userId,
            },
        });
      
        return count;
    }

    async getAllSongs(userId: number, skip: any, perPage: any) {
        const query: Prisma.SongWhereInput = {};
      
        if (userId) {
            query.userId = userId;
        }
      
        const songs = await prisma.song.findMany({
            where: query,
            skip: parseInt(skip, 10) || undefined,
            take: parseInt(perPage, 10) || undefined,
        });
      
        return songs;
    }

    async getSongById(userId: number, songId: number) {
        const song = await prisma.song.findUnique({
          where: {
            userId: userId,
            id: songId,
          },
        });
      
        return song;
    }

    async updateSong(userId: number, songId: number, data: any) {
        const song = await prisma.song.update({
          where: {
            userId: userId,
            id: songId,
          },
          data: {
            ...data,
          },
        });
      
        return song;
    }

    async deleteSong(userId: number, songId: number) {
        const song = await prisma.song.delete({
          where: {
            userId: userId,
            id: songId,
          }
        });
      
        return song;
    }
}

export default MusicRepository;
