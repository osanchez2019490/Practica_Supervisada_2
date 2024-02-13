const Estudiante = require('../models/estudiante');
const {response} = require('express');
const bcrypt = require('bcrypt');

const estudiantePost = async (req, res) =>{
    const {materias, role, password,...resto} = req.body;
  
    const estudiante = new Estudiante({materias, role, password,...resto});

    estudiante.role = 'STUDENT_ROLE';
    estudiante.materias = 'NADA ASIGNADO';

    const salt = bcrypt.genSaltSync();
    estudiante.password = bcrypt.hashSync(password, salt);

    await estudiante.save();
    res.status(202).json({
        estudiante
    });
}


module.exports = {
    estudiantePost
}

