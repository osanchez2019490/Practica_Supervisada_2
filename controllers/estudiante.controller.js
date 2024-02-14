const Estudiante = require('../models/estudiante');
const {response} = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const estudiantePost = async (req, res) =>{
    const {materias, role, password,...resto} = req.body;
  
    const estudiante = new Estudiante({materias, role, password,...resto});

    estudiante.role = 'STUDENT_ROLE';

    const salt = bcrypt.genSaltSync();
    estudiante.password = bcrypt.hashSync(password, salt);

    await estudiante.save();    
    res.status(202).json({
        estudiante
    });
}

const putEstudiante = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, password, estado, correo, role,...resto} = req.body;
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ msg: 'No hay token, autorización denegada' });
    }

    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

    if(!decoded || !decoded.uid || decoded.uid !== id){
        return res.status(403).json({ msg: 'No tienes permiso para actualizar este perfil' });
    }
    if(password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    await Estudiante.findByIdAndUpdate(id, resto, {new: true});

    const estudianteActualizado = await Estudiante.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        msg: 'Estudiante Actualizado Exitosamente!!!',
        estudiante: estudianteActualizado
    });
}

const deleteEstudiante = async (req, res = response) =>{
    const { id } = req.params;
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ msg: 'No hay token, autorización denegada' });
    }

    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
     
    if(!decoded || !decoded.uid || decoded.uid !== id){
        return res.status(403).json({ msg: 'No tienes permiso para eliminar este perfil' });
    }

    const estudianteAutentico = req.estudiante;
    const estudianteActualizado = await Estudiante.findByIdAndUpdate(id, {estado: false}, { new: true });

    res.status(200).json({
        msg: 'Estudiante Eliminado Exitosamente!!!',
        estudianteAutentico,
        estudiante: estudianteActualizado
    });
}



module.exports = {
    estudiantePost,
    putEstudiante,
    deleteEstudiante
}

