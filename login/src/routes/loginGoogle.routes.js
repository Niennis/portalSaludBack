import { Router } from 'express';
import { loginGoogle } from '../controllers/loginGoogle.controller.js';
import { oauth } from '../controllers/oauth.js'

const router = Router();

router.post('/', loginGoogle)
router.get('/oauth', oauth)


export default router;