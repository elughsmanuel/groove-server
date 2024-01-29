import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import http from "http";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const app = express();
const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT || 8000);
const httpServer = http.createServer(app);

const prisma = new PrismaClient()

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

app.post('/api/v1/products', async (req, res) => {
    const { name, description, price, category, quantity } = req.body;

    if (!name || !description || !price || !category || !quantity) {
        return res.status(400).json({ error: 'Name, price, category, and quantity are required fields' });
    }

    const newProduct = await prisma.product.create({
        data: {
          name, 
          description,
          price,
          category,
          quantity,
        },
    });

    res.status(201).json(newProduct);

});

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
 