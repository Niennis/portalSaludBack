import { Router } from 'express';
import { getAppointments, getAppointment, createAppointment, updateAppointment, deleteAppointment } from '../controllers/appointment.controller.js';

const router = Router();

router.get('/appointments', getAppointments)

router.get('/appointments/:id', getAppointment)

router.post('/appointments', createAppointment)

router.put('/appointments/:id', updateAppointment)

router.delete('/appointments/:id', deleteAppointment)

export default router;
