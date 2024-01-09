import express from 'express';
import scheduleRoutes from './routes/schedule.routes.js'
import cors from 'cors';

const app = express ()
const PORT = 3012

app.use(cors())
app.use(express.json())

app.use('/api', scheduleRoutes)

app.listen(PORT)
console.log(`Escuchando el puerto ${PORT}`);