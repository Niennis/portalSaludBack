import express from 'express';
import specialtyRoutes from './routes/specialty.routes.js'
import cors from 'cors';

const app = express ()

app.use(cors())
app.use(express.json())

app.use('/api', specialtyRoutes)

app.listen(3005)
console.log('Escuchando el puerto...');