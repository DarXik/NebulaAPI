import express from 'express';
import mongoose from "mongoose";
import {router} from "../routes/routes";
import dotenv from 'dotenv';

dotenv.config()

const mongoString = process.env.DATABASE_URL ?? "mongodb+srv://davca:8oyPePYwEAGYbtih@nebulaapi.xvcugto.mongodb.net/PossibleNames";
const app = express();
mongoose.connect(mongoString);
const database = mongoose.connection


console.log(mongoString)
// enable JSON body parser
app.use(express.json());

app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Hello World!');
});
database.on('error', (error: Error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log(database.name);
})
export default app;
module.exports = app;