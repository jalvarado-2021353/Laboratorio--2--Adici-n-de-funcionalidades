//Rutas de funciones de appointment
import { Router } from 'express';
import { createAppointment, getAll, get, updateAppointment, deleteAppointment } from './appointment.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js';
import { validateClientRole } from '../../middlewares/validate.role.js';

const api = Router();

// Crear una cita (solo CLIENT)
api.post
('/create',
     [validateJwt, validateClientRole],
      createAppointment
)

api.get(
    '/',
    getAll
)

api.get(
    '/:id',
    get
)

api.put(
    '/updateAppointment/:id',  
    updateAppointment
)

api.delete(
    '/deleteAppointment/:id',
    deleteAppointment
)

export default api;
