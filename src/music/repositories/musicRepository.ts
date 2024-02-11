import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MusicRepository {
    async getTotalSongCount() {
        const count = await prisma.song.count();
      
        return count;
    }

    async getAllSongs(skip: any, perPage: any) {
        const songs = await prisma.song.findMany({
            skip: parseInt(skip, 10) || undefined,
            take: parseInt(perPage, 10) || undefined,
        });
      
        return songs;
    }

    async getSongById(songId: number) {
        const song = await prisma.song.findUnique({
          where: {
            id: songId,
          },
        });
      
        return song;
    }
}

export default MusicRepository;
