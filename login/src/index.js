import express from 'express';
import loginGoogleRoutes from './routes/loginGoogle.routes.js'
import cors from 'cors';

const app = express ()

app.use(cors())
app.use(express.json())

app.use('/', loginGoogleRoutes)

app.listen(3010)
console.log('Escuchando el puerto 3010');