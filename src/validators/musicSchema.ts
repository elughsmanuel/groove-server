import Joi from "joi";

export const songSchema = Joi.object({
    title: Joi.string().trim().required().messages({
        "any.required": "Title is required",
        "string.empty": "Title cannot be empty",
    }),
    artist: Joi.string().trim().required().messages({
        "any.required": "Artist is required",
        "string.empty": "Artist cannot be empty",
    }),
    album: Joi.string().trim().required().messages({
        "any.required": "Album is required",
        "string.empty": "Album cannot be empty",
    }),
    genre: Joi.string().trim().required().messages({
        "any.required": "Genre is required",
        "string.empty": "Genre cannot be empty",
    }),
    releaseYear: Joi.number().integer().required().messages({
        "any.required": "Release year is required",
        "number.base": "Release year must be a number",
        "number.integer": "Release year must be an integer",
    }),
    url: Joi.string().trim().required().messages({
        "any.required": "URL is required",
        "string.empty": "URL cannot be empty",
    }),
    albumArt: Joi.string().trim().required().messages({
        "any.required": "Album art URL is required",
        "string.empty": "Album art URL cannot be empty",
    }),
});

export const updateSongSchema = Joi.object({
    title: Joi.string().trim(),
    artist: Joi.string().trim(),
    album: Joi.string().trim(),
    genre: Joi.string().trim(),
    releaseYear: Joi.number().integer(),
    url: Joi.string().trim(),
    albumArt: Joi.string().trim(),
});
