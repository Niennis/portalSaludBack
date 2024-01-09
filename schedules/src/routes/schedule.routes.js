import { Router } from 'express';
import { getSchedules, getSchedule, createSchedule, updateSchedule, deleteSchedule } from '../controllers/schedule.controller.js';

const router = Router();

router.get('/schedules', getSchedules)

router.get('/schedules/:id', getSchedule)

router.post('/schedules', createSchedule)

router.put('/schedules/:id', updateSchedule)

router.delete('/schedules/:id', deleteSchedule)

export default router;
