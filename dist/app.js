"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const http_status_codes_1 = require("http-status-codes");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT || 8000);
const httpServer = http_1.default.createServer(app);
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: `${http_status_codes_1.ReasonPhrases.OK} : Homepage`,
    });
});
app.get('/api', (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: `${http_status_codes_1.ReasonPhrases.OK} : API`,
    });
});
app.get('/api/v1', (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: `${http_status_codes_1.ReasonPhrases.OK} : API - v1`,
    });
});
app.all('*', (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        data: `Can't find ${req.originalUrl} on this server.`,
    });
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        httpServer.listen(port, host, () => {
            console.log(`🌟 🛠️  [SERVER] - Server is listening on http://${host}:${port}`);
        });
    }
    catch (error) {
        console.log(`[SERVER] - Failed to start. Encountered an error during startup.`, error);
    }
});
startServer();
exports.default = app;
