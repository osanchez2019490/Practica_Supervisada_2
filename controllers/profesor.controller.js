const Profesor = require('../models/profesor');
const {responde} = require('express');
const bcrypt = require('bcrypt');

const profesorPost = async(req, res) => {
    const {role, password , ...resto} = req.body;

    const profesor = new Profesor({role, password, ...resto});

    profesor.role = 'TEACHER_ROLE';

    const salt = bcrypt.genSaltSync();
    profesor.password = bcrypt.hashSync(password, salt);
    
    await profesor.save();
    res.status(202).json({
        profesor
    });
    


}

module.exports = {
    profesorPost
}