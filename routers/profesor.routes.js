const { Router } = require('express');
const { check } =  require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarjwtEstuadiante } = require('../middlewares/validar-jwt');

const { esGradoValido } = require('../helpers/db-validator');

const {materiaPost} = require('../controllers/materia.controller');

const router = Router();

router.post(
    '/',
    [

    ],materiaPost)

module.exports = router;