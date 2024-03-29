const Grado = require('../models/grado');
const Role = require('../models/role');
const Estudiante = require ('../models/estudiante');
const Profesor = require('../models/profesor');
const Materia = require('../models/materia');


const esGradoValido = async (grado = '') => {
    const existeGrado = await Grado.findOne({grado});
    if(!existeGrado) {
        throw new Error(`El grado ${ grado } no existe en la base de datos`);
    };

};


const esRolValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol) {
        throw new Error(`El role ${ role } no existe en la base de datos`);
    };
};

const materiaExistente = async (nombre = '') => {
    const existeMateria = await Materia.findOne({nombre});
    if (existeMateria) {
        throw new Error(`La materia ${ nombre } ya existe en la base datos`);
    }
}

const esProfesorValido = async (nombre = '') => {
    const existeProfesor = await Profesor.findOne({nombre});
    if(!existeProfesor) {
        throw new Error(`El profesor ${ nombre } no existe en la base de datos`);
    };
};


const existeEmail = async(correo = '') => {
    const existeEmail = await Profesor.findOne({correo});
    const existeEstudiante = await Estudiante.findOne({correo});
    if(existeEmail ||  existeEstudiante){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    };
};

const existeEstudianteById = async (id = '') =>{
    const existeEstudiante = await Estudiante.findOne({id});
    if(existeEstudiante){
        throw new Error(`El estudiante con el ${ id } no existe`)

    }
}

const existeProfesorByid = async(id = '') => {
    const existenteProfesor = await Profesor.findOne({id});
    if(existenteProfesor) {
        throw new Error(`El profesor con el ${ id } no existe`)
    }
}

module.exports = {
    esGradoValido,
    esRolValido,
    existeEmail,
    existeEstudianteById,
    esProfesorValido,
    existeProfesorByid,
    materiaExistente

}