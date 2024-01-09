import express from 'express';
import usersRoutes from './routes/users.routes.js'
import cors from 'cors';

const app = express ()

app.use(cors())
app.use(express.json())

app.use('/api', usersRoutes)

app.listen(3002)
console.log('Escuchando el puerto 3002');