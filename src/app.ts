import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import http from "http";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import yamljs from 'yamljs';
import { errorMiddleware } from './middleware/errorMiddleware';
import authRouter from './auth/routers/authRouter';
import userRouter from './user/routers/userRouter';
import musicRouter from './music/routers/musicRouter';

const app = express();
const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT || 8000);
const httpServer = http.createServer(app);

const prisma = new PrismaClient()

const docs = yamljs.load(path.join(__dirname, '../src/docs.yaml'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    return  res.status(StatusCodes.OK).json({
        success: true,
        data: `${ReasonPhrases.OK} : Homepage`,
    });
});

app.get('/api', (req, res) => {
    return  res.status(StatusCodes.OK).json({
        success: true,
        data: `${ReasonPhrases.OK} : API`,
    });
});

app.get('/api/v1', (req, res) => {
    return  res.status(StatusCodes.OK).json({
        success: true,
        data: `${ReasonPhrases.OK} : API - v1`,
    });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/music', musicRouter);

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(docs));

app.all('*', (req, res) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: `Can't find ${req.originalUrl} on this server.`,
    });
});

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log(`[DATABASE] - Database connection has been successfully established.`);

        app.use(errorMiddleware);

        try {
            httpServer.listen(port, host, () => {
                console.log(`🌟 🛠️  [SERVER] - Server is listening on http://${host}:${port}`);
            });
        } catch (error){
            console.log(`[SERVER] - Failed to start. Encountered an error during startup.`, error);
        } 
    } catch (error) {
        console.log(`[DATABASE] - Server not started due to database connection error.`, error);
    }
  
};

startServer();

export default app;
 