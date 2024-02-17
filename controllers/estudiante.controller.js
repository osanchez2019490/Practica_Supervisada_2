const Estudiante = require('../models/estudiante');
const Materia = require('../models/materia');
const {response} = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const estudiantePostMateria = async (req, res) => {
    const { materia } = req.body;
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: 'No hay token'
        });
    }

    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    
    const estudiante = await Estudiante.findById(decoded.uid);
    if (!estudiante) {
        return res.status(404).json({
            msg: 'Estudiante no encontrado'
        });
    }

    if (estudiante.materias.includes(materia)){
        return res.status(400).json({
            msg: 'El estudiante ya tiene asignada esta materia'
        });
    }

    const materiaEncontrada = await Materia.findOne({nombre: materia});

    if (!materiaEncontrada){
        return res.status(404).json({
            msg: 'Materia no encontrada'
        });
    }

    if (!materiaEncontrada.estado){
        return res.status(400).json({
            msg: 'La materia no esta disponible'
        });
    }

    if (!estudiante.grado.includes(materiaEncontrada.grado)) {
        return res.status(404).json({
            msg: 'El estudian no puede incribirse a cursos que no sean de su grado'
        });
    }

    if (estudiante.materias.length >= 3){
        return res.status(400).json({
            msg: 'Ya tienes asignado 3 materias'
        });
    }

    estudiante.materias.push(materiaEncontrada._id);
    await estudiante.save();

    res.status(200).json({
        msg:'Materia asignada correctamente'
    });

}

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
    const {_id, password, estado, correo, role, grado, ...resto} = req.body;
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ msg: 'No hay token, autorización denegada' });
    }

    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    if(!decoded || !decoded.uid || decoded.uid !== id){
        return res.status(403).json({ msg: 'No tienes permiso para actualizar este perfil' });
    }
    if(password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    await Estudiante.findByIdAndUpdate(id, resto, {new: true});

    const estudianteAnterior = req.estudiante;
    const estudianteActualizado = await Estudiante.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        msg: 'Estudiante Actualizado Exitosamente!!!',
        estudiante: estudianteActualizado,
        estudianteAnterior
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

const getMateriasDeEstudiante = async (req, res) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token'
        })
    }

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const estudiante = await Estudiante.findById(uid);

    if(!estudiante){
        return res.status(404).json({
            msg: 'Estudiante no encontrado'
        })
    }

    let materias = await Materia.find({
        _id: { $in: estudiante.materias}
    })

    if(materias.length == 0){
        return res.status(200).json({
            msg: 'El estudiante no tiene ninguna clase'
        })
    }

    materias = materias.filter(materia => materia.estado);

    const materiasConInfo = [];

    for (const materia of materias){
        const infoMateria = {
                nombre: materia.nombre,
                descripcion: materia.descripcion,
                grado: materia.grado,
                profesor: materia.profesor
        };
        materiasConInfo.push(infoMateria);
    }

    res.status(200).json({
        materias: materiasConInfo
    });
}

module.exports = {
    estudiantePost,
    putEstudiante,
    deleteEstudiante,
    estudiantePostMateria,
    getMateriasDeEstudiante
}

