//Moselo de citas

import { Schema,model } from "mongoose"

const appointmentSchema = Schema(
    {
        date:{
            type: String,
            required: [true, 'Date is required'],
            maxLength: [25, `Can't be overcome 25 characters`],
        },
        description: {
            type: String,
            maxLength:[100,  `Can't be overcome 25 characters `]
        },
        user:{
            type: String,
            required: [true, 'User is required']
        },
        animal: {
            type: String,
            required: [true, 'Animal is required']
        }
    }
)

export default model('Appointment', appointmentSchema)