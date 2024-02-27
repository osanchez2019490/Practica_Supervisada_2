const {Schema, model} = require('mongoose');

const defaultGrados = [
    { grado: 'CUARTO'},
    { grado: 'QUINTO'},
    { grado: 'SEXTO'},
];

const GradoSchema = Schema ({
    grado:{
        type: String,
        required: [true, 'El grado es obligatorio']
    }
});

const Grado = model('Grado', GradoSchema);

defaultGrados.forEach(async(defaultGrados) => {
    try {
        const existeGrado = await Grado.findOne({ grado: defaultGrados.grado });
        if(!existeGrado) {
            await Grado.create(defaultGrados);
            console.log(`Grado preterminado ${defaultGrados.grado} creado`);
        }
    } catch (e) {
        console.error('Error al crear los grados preterminados:', e);
    }
});

module.exports = Grado;