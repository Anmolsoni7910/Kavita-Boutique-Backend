import dotenv from 'dotenv';
dotenv.config();
import app from './index.js';
import { mongodbConnect } from './config/db.js';

const PORT = process.env.PORT || 5454;

app.listen(PORT,async() => {
    await mongodbConnect();
    console.log(`server is listening on PORT: ${PORT}`);
})