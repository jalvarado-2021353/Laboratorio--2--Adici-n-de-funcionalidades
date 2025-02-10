//Rutas de funciones de usuario
import { Router } from 'express'
import { get, getAll, updateUser, cambiarPassword , deleteUser } from './user.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { UpdateValidator } from '../../helpers/validators.js'

const api = Router()

//Rutas privadas
api.get(
    '/', 
    [validateJwt], //Solo accesan si está logeado
    getAll
)
api.get(
    '/:id', 
    [validateJwt], //Solo accesan si está logeado
    get
)

api.put(
    '/updateUser/:id',
    updateUser
)

api.put(
    '/deleteUser/:id',
    deleteUser
)

api.put(
   '/cambiarPassword/:id',
   [validateJwt, cambiarPassword ],
   cambiarPassword
)

export default api