const { Router, response } = require("express");
const { check } = require("express-validator");
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require("../controllers/usuariosController");
const { esRolValido, emailExiste, usuarioExiste } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const usuariosRouter = Router();

usuariosRouter.get('/', usuariosGet)

usuariosRouter.put('/:id', [
    check('id', 'El id debe de ser un id de mongo valido').isMongoId(),
    check('id').custom( usuarioExiste ),
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPut)

usuariosRouter.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email debe ser valido').isEmail().custom( emailExiste ),
    check('password', 'La contraseña debe de tener minimo 6 letras').isLength( { min : 6} ),
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPost)

usuariosRouter.delete('/:id',[
    check('id', 'El id debe de ser un id de mongo valido').isMongoId(),
    check('id').custom( usuarioExiste ),
    validarCampos
], usuariosDelete)


module.exports = usuariosRouter;