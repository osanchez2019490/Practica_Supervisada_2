const { request, response } = require('express');
const Materia = require('../models/materia');
const Profesor = require('../models/profesor');

const jwt = require('jsonwebtoken');


const materiaPost = async (req, res) => {
    const {nombre, duracion, descripcion, profesor, grado} = req.body;
    const materia = new Materia ({nombre, duracion, descripcion, profesor, grado});

    await materia.save();
    res.status(202).json({
        materia
    });
}

const materiasGet= async (req, res) => {
    const { limite, desde} = req.query;
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'Tokeno no proporcionado'
        })
    }

    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    
    const profesorId = decoded.uid;

    const profesor = await Profesor.findById(profesorId);

    if(!profesor){
        return res.status(400).json({
            msg: 'Profesor no encontrado'
        });
    }



    const query = { estado: true, profesor: profesor.nombre };

    const [total, materias] = await Promise.all ([
       Materia.countDocuments(query),
       Materia.find(query)
       .skip(Number(desde))
       .limit(Number(limite))
    ])

    res.status(200).json({
        total,
        materias
    })
}
module.exports = {
    materiaPost,
    materiasGet
}