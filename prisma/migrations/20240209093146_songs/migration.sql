-- CreateTable
CREATE TABLE "songs" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "artist" VARCHAR(255) NOT NULL,
    "album" VARCHAR(255) NOT NULL,
    "genre" VARCHAR(255) NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "albumArt" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);
