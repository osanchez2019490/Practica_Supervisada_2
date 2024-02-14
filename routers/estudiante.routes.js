const { Router } = require('express');
const { check } =  require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarjwtEstuadiante } = require('../middlewares/validar-jwt');

const {putEstudiante, deleteEstudiante } = require('../controllers/estudiante.controller');

const { esGradoValido, existeEmailEstudiante, existeEstudianteById} = require('../helpers/db-validator');
const router = Router();

router.put(
    "/:id",
    [
        validarjwtEstuadiante,
        check("id", "El id no tiene que ir vacio").not().isEmpty(),
        check("id").custom(existeEstudianteById),
        check("nombre", "El nombre del estudiante es obligatorio").not().isEmpty(),
        check("correo", "El correo no es un correo valido").isEmail(),
        check("correo").custom(existeEmailEstudiante),
        check ("grado", "El estudiante necesita un grado").not().isEmpty(),
        check("grado").custom(esGradoValido),
        check("password", "Se necestia una contraseña").not().isEmpty(),
        check("password", "Deber ser mayor a 6 caracteres").isLength({min: 6}),
        validarCampos
    ], putEstudiante)

router.delete(
    "/:id",
    [
        validarjwtEstuadiante,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos
    ], deleteEstudiante)
module.exports = router;