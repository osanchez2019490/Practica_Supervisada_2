const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { estudiantePost } = require('../controllers/estudiante.controller');

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre del estudiante es obligatorio").not().isEmpty(),
        check("correo", "El correo no es un correo valido").isEmail(),
        validarCampos
    ], estudiantePost);

module.exports = router;