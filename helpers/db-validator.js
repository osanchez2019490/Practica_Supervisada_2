const Grado = require('../models/grado');
const Role = require('../models/role');
const Estudiante = require ('../models/estudiante');
const Profesor = require('../models/profesor');

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

const esRolValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol) {
        throw new Error(`El role ${ role } no existe en la base de datos`);
    };
};

const existeEmailProfesor = async(correo = '') => {
    const existeEmail = await Profesor.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    };
};


module.exports = {
    esGradoValido,
    existeEmailEstudiante,
    esRolValido,
    existeEmailProfesor

}