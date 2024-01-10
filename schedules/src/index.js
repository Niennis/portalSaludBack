import express from 'express';
import scheduleRoutes from './routes/schedule.routes.js'
import cors from 'cors';
import 'dotenv/config';

const PORT = process.env.PORT

const app = express ()
app.use(cors())
app.use(express.json())

app.use('/api', scheduleRoutes)

app.listen(PORT)
console.log(`Escuchando el puerto ${PORT}`);