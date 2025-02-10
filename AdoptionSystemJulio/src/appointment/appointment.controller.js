import Appointment from "./appointment.model.js"
import User from "../user/user.model.js" 
import Animal from "../animal/animal.model.js"

export const createAppointment = async (req, res) => {
    const data = req.body
    try {
        const animal = await Animal.findOne({_id:data.animal})
        if (!animal) return res.status(403).send(
            {
                success: false, 
                message: 'Animal not found'
            }
        )
        const user = await User.findOne({ _id:data.user})
        if (!user) return res.status(403).send(
            {
                success: false, 
                message: 'Client not found'
            }
        )
        const appointment = new Appointment(data)
        await appointment.save()

        return res.send(
            {
                success: true, 
                message: 'Appointment saved successfully'
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General Error', err })
    }
}

export const getAll = async (req,res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const appointment = await Appointment.find()
        .skip(skip)
        .limit(limit)
        if (appointment.length === 0) return res.status(404).send({message: 'Appointment not found', success: false})
            return res.send(
                {
                    success: true,
                    message: 'Appointment found: ', 
                    appointment,
                    total: appointment.length
                }
            )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const get = async(req, res)=>{
    try{
        const { id } = req.params
        const appointment = await Appointment.findById(id)

        if(!appointment) return res.status(404).send(
            {
                sucess: false,
                message: 'Appointment not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found',
                appointment
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const updateAppointment = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if(!id) return res.status(400).send({ message: 'Invalid ID' });
        const updateAppointment = await Appointment.findByIdAndUpdate(id, data, { new: true });
        if(!updateAppointment) return res.status(404).send({ message: 'Appointment not found' });
        return res.send({ message: 'Appointment updated successfully', updateAppointment });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General Error', err });
    }
}

export const deleteAppointment = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({ message: 'Invalid ID' });
        const deleteAppointment = await Appointment.findByIdAndDelete(id);
        if (!deleteAppointment) return res.status(404).send({ message: 'Appointment not found' });
        return res.send({ message: 'Appointment deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General Error', err });
    }
}

