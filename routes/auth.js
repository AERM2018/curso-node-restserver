const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');

const authRouter = Router();

authRouter.post('/login',[
    check('email','El email es obligatorio').notEmpty(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validarCampos,

],login)

module.exports = authRouter;