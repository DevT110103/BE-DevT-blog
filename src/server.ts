import path from 'path';
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import route from './routes';
import connectDB from './configs/connectDatabase';

dotenv.config();

const app = express();
const port = process.env.PORT || 8090;

connectDB();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
route(app);

app.listen(port, () => {
  console.log(`⚡ Server is running on port ${port}`);
});
