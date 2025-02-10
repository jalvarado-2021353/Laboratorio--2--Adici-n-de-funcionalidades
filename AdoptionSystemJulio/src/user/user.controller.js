//Lógica de negocio

import User from "./user.model.js"
import { checkPassword, encrypt } from "../../utils/encrypt.js"

export const getAll = async(req, res)=>{
    try{
        //Configuraciones de paginación
        const { limit = 20, skip = 0 } = req.query
        const users = await User.find()
            .skip(skip)
            .limit(limit)

        if(users.length === 0) return res.status(404).send({message: 'Users not found', success: false})
        return res.send(
            {
                success: true,
                message: 'Users found: ', 
                users,
                total: users.length
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

//Obtener 1 usuario por su ID
export const get = async(req, res)=>{
    try{
        const { id } = req.params
        const user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                sucess: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found',
                user
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

export const updateUser = async(req,res)=>{
    try {
        const id = req.params.id
        const data = req.body
        if (!id) return res.status(400).send({ message: 'Invalid ID' }); // Verificar que el ID es válido
        const updateUser = await User.findByIdAndUpdate(id,data,{new:true})
        if (!updateUser)return res.status(404).send({Message: 'User not found'})
            return res.send({message: 'User updated succesfully', updateUser})
    } catch (err) {
        console.console.log(err);
        return res.status(500).send({message: 'General Error',err})
    }
}

export const cambiarPassword = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del usuario
        const { currentPassword, newPassword } = req.body; // Obtener contraseñas

        // Verificar si el usuario existe
        const user = await User.findById(id);
        if (!user) return res.status(404).send({ message: 'User not found' });

        // Verificar si la contraseña actual es correcta
        const passwordMatch = await checkPassword(user.password, currentPassword); 
        if (!passwordMatch) return res.status(400).send({ message: 'Incorrect current password' });


        // Encriptar la nueva contraseña
        user.password = await encrypt(newPassword);
        await user.save();

        return res.send({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('❌ ERROR en cambiarPassword:', err);
        return res.status(500).send({ message: 'General Error', error: err.message || err });
    }
}


export const deleteUser = async(req, res)=>{
    try {
        const id = req.params.id
        const deleteUser= await User.findByIdAndDelete(id)
        if (!deleteUser)return res.status(404).send({Message: 'User not found'})
            return res.send({message: 'User deleted succesfully'})
    } catch (err) {
        console.console.log(err);
        return res.status(500).send({message: 'General Error',err})
    }   
}