import express from 'express'

import { apiRouter } from '#routers'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('hello farbros infinity api');
});

app.use('/api', apiRouter);

export default app;