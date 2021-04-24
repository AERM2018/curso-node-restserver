const { Router } = require("express");
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require("../controllers/usuariosController");

const usuariosRouter = Router();

usuariosRouter.get('/', usuariosGet)

usuariosRouter.put('/:id', usuariosPut)

usuariosRouter.post('/', usuariosPost)

usuariosRouter.delete('/', usuariosDelete)


module.exports = usuariosRouter;