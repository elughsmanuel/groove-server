import { Request, Response, NextFunction } from 'express'; 
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import Unauthenticated from '../errors/Unauthenticated';
import BadRequest from '../errors/BadRequest';
import UnprocessableEntity from '../errors/UnprocessableEntity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { 
    UNIQUE_CONSTRAINT,
 } from '../auth/utils/constants';

export const errorMiddleware = (
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction,
) => {
    if (err instanceof Unauthenticated) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }

    if (err instanceof BadRequest) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }

    if (err instanceof UnprocessableEntity) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }

    // Handle input/Joi validation errors
    if (err instanceof Joi.ValidationError) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            success: false,
            data: err.details[0].message,
        });
    }

    // Handle Prisma unique constraint violation errors
    if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            const match = err.message.match(/Unique constraint failed on the fields: \((.*?)\)/);
            const fields = match ? match[1].split(', ') : [];

            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                data: UNIQUE_CONSTRAINT,
            });
        }
    }

    // Handle errors in development by logging the stack
    if (process.env.NODE_ENV === 'development') {
        console.log(err.message);
        console.log(err.stack);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: err.message,
            stack: err.stack,
        });
    }

    // Handle errors in production by sending a generic error message
    else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong.',
        });
    }
};
