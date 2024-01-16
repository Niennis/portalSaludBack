import { Router } from 'express';
import {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsSimple,
  getAppointmentsSimpleUser
} from '../controllers/appointment.controller.js';

const router = Router();

router.get('/appointments', getAppointments)

router.get('/appointments/:id', getAppointment)

router.post('/appointments', createAppointment)

router.put('/appointments/:id', updateAppointment)

router.patch('/appointments/:id', deleteAppointment)

router.get('/appintsimple', getAppointmentsSimple)

router.get('/appintsimple/:id', getAppointmentsSimpleUser)
export default router;
