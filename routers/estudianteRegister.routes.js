const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { estudiantePost } = require('../controllers/estudiante.controller');

const { esGradoValido, existeEmailEstudiante, existeEmail} = require('../helpers/db-validator');

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre del estudiante es obligatorio").not().isEmpty(),
        check("correo", "El correo no es un correo valido").isEmail(),
        check("correo").custom(existeEmail),
        check ("grado", "El estudiante necesita un grado").not().isEmpty(),
        check("grado").custom(esGradoValido),
        check("password", "Se necestia una contraseña").not().isEmpty(),
        check("password", "Deber ser mayor a 6 caracteres").isLength({min: 6}),
        validarCampos
    ], estudiantePost);

module.exports = router;