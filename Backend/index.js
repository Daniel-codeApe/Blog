import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose
.connect(process.env.MONGO)
.then(() => {console.log("database connected")})
.catch((err) => {console.log(err)});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});