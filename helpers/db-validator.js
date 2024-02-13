const Grado = require('../models/grado');
const Estudiante = require ('../models/estudiante');

const esGradoValido = async (grado = '') => {
    const existeGrado = await Grado.findOne({grado});
    if(!existeGrado) {
        throw new Error(`El grado ${ grado } no existe en la base de datos`);
    };

};

const existeEmailEstudiante = async(correo = '') => {
    const existeEmeail = await Estudiante.findOne({correo});
    if(existeEmeail){
        throw new Error (`El correo ${ correo } ya esta registrado`);
    };
};



module.exports = {
    esGradoValido,
    existeEmailEstudiante

}