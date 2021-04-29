const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagen, obtenerImagen, actualizarImagenCloudinary } = require('../controllers/uploadsController');
const { inColeccionesPermitidas } = require('../helpers/db-validator');
const { validarArchivo } = require('../middlewares/validar-archivos');
const { validarCampos } = require('../middlewares/validar-campos');

const uploadsRouter = Router();

uploadsRouter.post( '/', validarArchivo , cargarArchivos)

uploadsRouter.put( '/:coleccion/:id', [
    validarArchivo,
    check('id','El id tiene que ser un id de mongo valido').isMongoId(),
    check('coleccion').custom( col => inColeccionesPermitidas( col, ['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudinary)

uploadsRouter.get( '/:coleccion/:id', [
    check('id','El id tiene que ser un id de mongo valido').isMongoId(),
    check('coleccion').custom( col => inColeccionesPermitidas( col, ['usuarios','productos'])),
    validarCampos
],obtenerImagen)
module.exports = uploadsRouter;