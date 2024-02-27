const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarjwtProfesor } = require('../middlewares/validar-jwt');
const { tieneRolAutorizado } = require('../middlewares/validar-roles')

const { esGradoValido, esProfesorValido, existeProfesorByid, materiaExistente} = require('../helpers/db-validator');

const { materiaPost, materiasGet, materiaGetById, putMateria, deleteMateria } = require('../controllers/materia.controller');

const router = Router();

router.post(
    '/',
    [
        validarjwtProfesor,
        tieneRolAutorizado('TEACHER_ROLE'),
        check("nombre", "El nombre de la materia es obligatorio").not().isEmpty(),
        check("nombre").custom(materiaExistente),    
        check("descripcion", "La materia necesita una descripcion").not().isEmpty(),
        check("duracion", "La materia necesita una duracion").not().isEmpty(),
        check("profesor", "La materia necesita un profesor").not().isEmpty(),
        check("profesor").custom(esProfesorValido),
        check("grado", "La materia necesita un grado").not().isEmpty(),
        check("grado").custom(esGradoValido),
        validarCampos
    ], materiaPost)

router.get("/",
    [
        validarjwtProfesor,
        tieneRolAutorizado('TEACHER_ROLE')
    ], materiasGet)

router.get("/:id",
    [
        validarjwtProfesor,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeProfesorByid),
        tieneRolAutorizado('TEACHER_ROLE')
    ], materiaGetById)

router.put("/:id",
    [
        validarjwtProfesor,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeProfesorByid),
        tieneRolAutorizado('TEACHER_ROLE'),
        validarCampos
    ], putMateria)

router.delete("/:id",
    [
        validarjwtProfesor,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeProfesorByid),
        tieneRolAutorizado('TEACHER_ROLE'),
        validarCampos
    ], deleteMateria)
module.exports = router;