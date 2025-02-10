//Validar campos en las rutas
import { body } from "express-validator" //Capturar todo el body de la solicitud
import { validateErrors,validateErrorWithoutImg } from "./validate.error.js"
import { existUsername, objectIdValid } from "./db.validators.js"

export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),//.isOPCIONAL
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email').notEmpty().isEmail(),
    body('username', 'Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('The password must be strong').isLength({min: 8}),
    body('phone', 'Phone cannot be empty or is not a valid phone').notEmpty().isMobilePhone(),
    validateErrors
]

export const loginValidator = [
    body('username', 'Username cannot be empty').notEmpty().toLowerCase(),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('The password must be strong').isLength({min: 8}),
    validateErrors
]

export const UpdateValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('username', 'Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('phone', 'Phone cannot be empty or is not a valid phone').notEmpty().isMobilePhone(),
    validateErrors
]

export const saveAnimal =[
    body('name', 'Name connot be empty').notEmpty().isLength({max: 35}),
    body('description','Description connot be empty').notEmpty(),
    body('type','Type connot be empty').notEmpty().toUpperCase(),
    body('age','Age cannot be empty').notEmpty().isLength({max: 10}),
    body('keeper','Keeper cannot be empty').notEmpty().custom(objectIdValid),
    body('status','Status cannot be empty').notEmpty(),
    validateErrorWithoutImg
]

export const appointmentValidator = [
    body('date', 'Date cannot be empty').notEmpty().isLength({ max: 25 }),
    body('animal', 'Animal cannot be empty').notEmpty(),
    body('description', 'Description cannot exceed 100 characters').optional().isLength({ max: 100 }),
    validateErrors
]