import express from 'express';
// import { MongoClient } from 'mongodb';
// import cors from 'cors';
import multer from 'multer';
import { connect } from 'mongoose';
import { config } from 'dotenv';

import userRoute from './routes/user.route.js';
import registerRoute from './routes/auth.route.js';

config();

connect(process.env.mongo).then(
    () => console.log("connected")
);

const app = express();
app.use(express.json());
// app.use(cors());


app.listen(3000, () => {
    console.log("running!");
});

app.use('/api/user', userRoute);
app.use('/api/auth', registerRoute);

// Middleware for errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        errorMessage
    });
});