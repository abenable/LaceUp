import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import { ErrorHandler } from './controllers/errorController.js';
import { authRouter } from './routes/authRoutes.js';
import { getDirname, limiter } from './utils/util.js';
import { userRouter } from './routes/userRoutes.js';
import logger from './utils/logger.js';

dotenv.config();

const port = process.env.PORT;
const uri =
    process.env.NODE_ENV === 'development'
        ? process.env.LOCAL_URI
        : process.env.URI;

const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

//Set various HTTP headers to enhance security
app.use(helmet());

//Limit repeated requests to prevent abuse
app.use('/', limiter);

// Protect against HTTP Parameter Pollution attacks
app.use(hpp());

//Routes
// Authentication routes
app.use('/auth', authRouter);

// User routes
app.use('/users', userRouter);


// Error handling middleware
app.use(ErrorHandler);

// Start the server
app.listen(port, async () => {
    logger.info(`Server running on port ${port}`);
    try {
        await mongoose.connect(uri);
        logger.info('Connected to the database.');
    } catch (error) {
        logger.error(error);
    }
});
