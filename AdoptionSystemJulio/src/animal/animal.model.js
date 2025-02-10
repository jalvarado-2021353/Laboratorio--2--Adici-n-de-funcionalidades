//Modelo Animal

import { Schema, model } from "mongoose"

const animalSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [40, `Can't be overcome 40 characters`]
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        type: {
            type: String,
            uppercase: true,
            required: [true, 'Type is required'],
        },
        age: {
            type: String,
            required: [true, 'Age is required'],
            maxLength: [10, `Can't be overcome 100 ages`]
        },
        keeper: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Keeper is required']
        },
        status:{
            type: Boolean,
            default: true,
            required: [true, 'Status is required']
        }
    },{
        versionKey: false, //Deshabilitar el __v(Version del documento)
        timestamp: true //Agrega propiedades de fecha (Fecha de creacion y de ultimo actualizacion)
    }
)


export default model('Animal', animalSchema)