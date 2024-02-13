const {Schema, model} = require('mongoose');

const GradoSchema = Schema ({
    grado:{
        type: String,
        required: [true, 'El grado es obligatorio']
    }
});

module.exports = model('Grado', GradoSchema);