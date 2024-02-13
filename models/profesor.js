const {Schema, model} = require('mongoose');

const ProfesorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del profesor es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        uniqued: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    role: {
        type: String,
        required: true,
        enume: ["TEACHER_ROLE", "STUDENT_ROLE"]
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mode('Profesor', ProfesorSchema)