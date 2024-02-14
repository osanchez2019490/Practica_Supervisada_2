const { Router } = require('express');
const { check } =  require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarjwtEstuadiante } = require('../middlewares/validar-jwt');

const {putEstudiante } = require('../controllers/estudiante.controller');

const router = Router();

router.put(
    "/:id",
    [
        validarjwtEstuadiante,
        check('id', 'No es un id valido').isMongoId(),
        validarCampos
    ], putEstudiante)

module.exports = router;