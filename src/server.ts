import path from 'path';
import express from 'express';
import * as dotenv from 'dotenv';

import route from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8090;

app.use(express.static(path.join(__dirname, 'public')));
route(app);

app.listen(port, () => {
  console.log(`⚡ Server is running on port ${port}`);
});
