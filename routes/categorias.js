const { Router } = require('express');
const { check } = require('express-validator');
const { getCategorias, getCategoriaById, postCategoria, putCategoria, deleteCategoria } = require('../controllers/categoriasController');
const { categoriaExiste } = require('../helpers/db-validator');
const { validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const categoriasRouter = Router();


categoriasRouter.get('/', getCategorias)

categoriasRouter.get('/:id',[
    check('id','El id de la categoria es obligatoria').notEmpty().isMongoId(),
    check('id').custom( categoriaExiste ),
    validarCampos
], getCategoriaById)

categoriasRouter.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
],postCategoria)

categoriasRouter.put('/:id',[
    validarJWT,
    check('id','El id de la categoria es obligatoria').notEmpty().isMongoId(),
    check('id').custom( categoriaExiste ),
    check('nombre','El nomnbre es obligatoria').notEmpty(),
    validarCampos
], putCategoria)

categoriasRouter.delete('/:id',[
    validarJWT,
    check('id','El id de la categoria es obligatoria').notEmpty().isMongoId(),
    check('id').custom( categoriaExiste ),
    validarCampos
], deleteCategoria)
module.exports = categoriasRouter;