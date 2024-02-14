const Profesor = require('../models/profesor');
const {responde} = require('express');
const bcrypt = require('bcrypt');

const profesorPost = async(req, res) => {
    const {role, password, correo, nombre } = req.body;

    const profesor = new Profesor({role, password, correo, nombre});


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