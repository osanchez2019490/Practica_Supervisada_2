const { Router } = require('express');
const { check } =  require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarjwtEstuadiante } = require('../middlewares/validar-jwt');

const {putEstudiante, deleteEstudiante, estudiantePostMateria } = require('../controllers/estudiante.controller');

const { existeEstudianteById } = require('../helpers/db-validator');
const router = Router();


router.post("/",
    [
        validarjwtEstuadiante,
        check("materia", "Debes poner una materia para asignarte").not().isEmpty(),
        validarCampos
    ], estudiantePostMateria)

router.put(
    "/:id",
    [
        validarjwtEstuadiante,
        check("id", "El id no tiene que ir vacio").not().isEmpty(),
        check("id").custom(existeEstudianteById),
        check("password", "Deber ser mayor a 6 caracteres").isLength({min: 6}),
        check ("grado", "No puedes cambiar tu grado").isEmpty(),
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