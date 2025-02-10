//Rutas de animal

import { Router } from 'express'
import { test, save, getAll, get, updateAnimal, deleteAnimal } from './animal.controller.js'
import { saveAnimal } from '../../helpers/validators.js'


const api = Router()

api.get('/test', test)

//rutas privadas
api.post(
    '/save',
    [saveAnimal],
    save
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
    '/updateAnimal/:id',  
    updateAnimal
)

api.delete(
    '/deleteAnimal/:id',
    deleteAnimal
)


export default api