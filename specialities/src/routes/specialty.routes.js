import { Router } from 'express';
import { getSpecialties, getSpecialty, createSpecialty, updateSpecialty, deleteSpecialty } from '../controllers/specialty.controller.js';

const router = Router();

router.get('/specialties', getSpecialties)

router.get('/specialties/:id', getSpecialty)

router.post('/specialties', createSpecialty)

router.put('/specialties/:id', updateSpecialty)

router.delete('/specialties/:id', deleteSpecialty)

export default router;
