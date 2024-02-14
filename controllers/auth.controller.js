const { request, response } = require('express');
const Estudiante = require('../models/estudiante');
const Profesor = require('../models/profesor');
const bycript = require('bcrypt');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req = request, res = response) =>{
    const {correo, password} = req.body;

    try{
        const estudiante = await Estudiante.findOne({correo});
        const profesor = await Profesor.findOne({correo});

        if(!profesor && !estudiante){
            return res.status(400).json({
                msg: "Credenciales incorrectas, correo no existente en la base de datos"
            }); 
        } 
        
        const usuario = estudiante || profesor;

        if(!usuario.estado){
            return res.status(400).json({
                msg: "El usaurio no existe en la base de datos"
            })
        }
        
        const validarPassword= bycript.compareSync(password, usuario.password);

        if(!validarPassword){
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
        } 
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: "Bienvenido",
            token
        })

        

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: "Comuniquse con el admistrador"
        });
    };
};

module.exports = {
    login
}