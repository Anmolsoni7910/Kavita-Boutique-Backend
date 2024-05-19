import dotenv from 'dotenv';
dotenv.config();
import app from './src/index.js';
import { mongodbConnect } from './src/config/db.js';

const PORT = process.env.PORT || 5454;

app.listen(PORT,async() => {
    await mongodbConnect();
    console.log(`server is listening on PORT: ${PORT}`);
})