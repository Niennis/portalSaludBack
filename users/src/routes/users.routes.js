import { Router } from 'express';
import { getUsers, getUser, getProfessionals, createUsers, updateUsers, deleteUsers, getProfessional, updateDoctor, createDoctor, changeStatus } from '../controllers/users.controller.js';

const router = Router();

router.get('/users', getUsers)
router.get('/professionals', getProfessionals)

router.get('/users/:id', getUser)
router.get('/professionals/:id', getProfessional)

router.post('/users', createUsers)
router.post('/professionals', createDoctor)

router.put('/users/:id', updateUsers)
router.put('/professionals/:id', updateDoctor)

router.delete('/users/:id', deleteUsers)

router.patch('/users/:id', changeStatus)

export default router;
