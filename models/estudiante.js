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
        validate: {
            validator: function(value){
                return value.length <= 5;
            },

            message: 'No se pueden agregar mas de 3 materias'
        },
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

    jornada: {
        type: String,
        required: [true, 'La jornada del estudiante es obligatorio']
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

module.exports = model('Estudiante', EstudianteSchema);