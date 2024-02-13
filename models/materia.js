const {Schema, model} = require('mongoose');

const MateriaSchema = Schema ({
    nombre:{
        type: String,
        required: [true, 'El nombre de la materia es obligatorio']
    },

    duracion: {
        type: String,
        required: [true, 'La materia tiene que tener una duracion']
    },

    descripcion: {
        type: String,
        required: [true, 'La materia tiene que tener una descripcion para el alumno']
    },

    profesor: {
        type: String,
        required: [true, 'La materia neceista un profesor']
    },

    grado:{
        type: String,
        required: true,
        enum: ["SEXTO", "QUINTO", "CUARTO"]
    },

    estado: {
        type: Boolean,
        default: true,
    }


})

module.exports = model('Materia', MateriaSchema);