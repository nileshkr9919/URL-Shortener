import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { router } from './routes';
import { connectMongoDB } from './datasources';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

async function startServer() {
    await connectMongoDB();

    app.use(router);

    app.listen(PORT, () => {
        console.log(`Server running, listening on PORT: ${PORT}`);
    });
}

startServer();
