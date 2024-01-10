import express from 'express';
import loginGoogleRoutes from './routes/loginGoogle.routes.js'
import cors from 'cors';
import 'dotenv/config';

const PORT = process.env.PORT

const app = express ()
app.use(cors())
app.use(express.json())

app.use('/', loginGoogleRoutes)

app.listen(PORT)
console.log(`Escuchando el puerto ${PORT}`);