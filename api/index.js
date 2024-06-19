const express = require('express')
// import { MongoClient } from 'mongodb';
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.mongo).then(
    () => console.log("connected")
);

const app = express();
app.use(cors());


let database_name = "blog";
var database;

app.listen(3001, () => {
    console.log("running!");
})
