const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {profesorPost} = require('../controllers/profesor.controller');

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre del estudiante es obligatorio").not().isEmpty(),
        check("correo", "El correo no es un correo valido").isEmail(),
        check("password", "Se necestia una contraseña").not().isEmpty(),
        check("password", "Deber ser mayor a 6 caracteres").isLength({min: 6}),
        validarCampos   
    ], profesorPost)

module.exports = router;