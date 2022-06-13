import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './utils/router';
import express, { Express } from 'express';
import { errorLogger, failSafeHandler } from './middlewares/error-handling';
import logs from './middlewares/morgan';

dotenv.config();
const port = process.env.PORT || 3000;

const app: Express = express();

app.use(express.json())
app.use(cors({ credentials: true, origin: true }))
app.use(helmet())

//Routes from router
app.use(routes)

//Error middleware
app.use(errorLogger)
app.use(failSafeHandler)
app.use(logs);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port} ⚡`);
});
