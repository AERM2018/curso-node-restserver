const { Router } = require('express');
const { check } = require('express-validator');
const { categoriaExiste, productoExiste, usuarioExiste } = require('../helpers/db-validator')
const { getProductos, getProductoById, postProducto, putProducto, deleteProducto } = require('../controllers/productosCotroller');
const { validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const productosRouter = Router();


productosRouter.get('/', getProductos)

productosRouter.get('/:id',[
    check('id','El id de la categoria es obligatoria').notEmpty().isMongoId(),
    check('id').custom( productoExiste ),
    validarCampos
], getProductoById)

productosRouter.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'La categoria es obligatoria').notEmpty().isMongoId(),
    check('categoria').custom( categoriaExiste ),
    validarCampos
],postProducto)

productosRouter.put('/:id',[
    validarJWT,
    check('id','El id del producto es obligatorio').notEmpty().isMongoId(),
    check('id').custom( productoExiste ),
    check('nombre','El nomnbre del producto es obligatorio').notEmpty(),
    check('categoria', 'La categoria es obligatoria').notEmpty().isMongoId(),
    check('categoria').custom( categoriaExiste ),
    // check('usuario', 'El usuario quien actualiza el producto es obligatorio').notEmpty().isMongoId(),
    // check('usuario').custom( usuarioExiste ),
    check('precio', 'El precio es obligatorio').isNumeric(),
    check('disponible', 'La disponibilidad del producto es obligatoria').isBoolean(),
    validarCampos
], putProducto)

productosRouter.delete('/:id',[
    check('id','El id del producto es obligatorio').notEmpty().isMongoId(),
    check('id').custom( productoExiste ),
    validarCampos
], deleteProducto)
module.exports = productosRouter;