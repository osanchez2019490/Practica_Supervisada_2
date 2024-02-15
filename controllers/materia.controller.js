const { request, response } = require('express');
const Materia = require('../models/materia');

const materiaPost = async (req, res) => {
    const {nombre, duracion, descripcion, profesor, grado} = req.body;
    const materia = new Materia ({nombre, duracion, descripcion, profesor, grado});

    await materia.save();
    res.status(202).json({
        materia
    });
}

module.exports = {
    materiaPost
}