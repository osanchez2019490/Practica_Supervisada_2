const jwt = require('jsonwebtoken');
const Estudiante = require('../models/estudiante');
const {request, response } = require('express');
const profesor = require('../models/profesor');

const validarjwtEstuadiante = async (req = request, res = response, next) =>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion',
        })
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const estudiante = await Estudiante.findById(uid);

        if(!estudiante) {
            return res.status(401).json({
                msg: "Estudiante no existe en la base de datos"
            });
        }

        if(!estudiante.estado){
            return res.status(401).json({
                msg: "Token no valido, estudiante con estado false"
            });
        }

        req.estudiante = estudiante;
        next();

    } catch(e){
        console.log(e);
        res.status(401).json({
            msg: "Token no valido"
        });
    };
}

const validarjwtProfesor = async (req = request, res = response, next) =>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion',
        })
    }

    try {
        const { iud } =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const profesor = await Profesor.findById(uid);

        if(!profesor){
            return res.status(401).json({
                msg: "Profesor no existe en la base de datos"
            });
        }

        if(!profesor.estado){
            return res.status(401).json({
                msg: "Tokeno no valido, profesor con estado false"
            });
        }

        req.profesor = profesor;

        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no valido"
        });
    }
}

module.exports = {
    validarjwtEstuadiante,
    validarjwtProfesor
}