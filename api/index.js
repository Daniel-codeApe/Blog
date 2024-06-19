import express from 'express';
// import { MongoClient } from 'mongodb';
import cors from 'cors';
import multer from 'multer';
import { connect } from 'mongoose';
import { config } from 'dotenv';

import userRoute from './routes/user.route.js';

config();

connect(process.env.mongo).then(
    () => console.log("connected")
);

const app = express();
app.use(cors());


app.listen(3000, () => {
    console.log("running!");
});

app.use('/api/user', userRoute);
