const {Schema, model} = require('mongoose');

const EstudianteSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del estudiante es obligatorio']
    },

    correo: {
        type:String,
        required: [true, 'El correo del estudiante es obligatorio'],
        uniqued: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    materias: {
        type: String,
        required: [true, 'El estudiante necesita materias'],
    },

    grado: {
        type: String,
        required: true,
        enum: ["SEXTO", "QUINTO", "CUARTO"]
    },

    carnet: {
        type: String,
        required: [true, 'El estudiante necesita su carnet'],
        uniqued: true
    },

    role: {
        type: String,
        required: true,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"]
    },

    estado: {
        type: Boolean,
        default: true
    }

})