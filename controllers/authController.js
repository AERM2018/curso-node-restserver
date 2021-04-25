const { response } = require("express");
const Usuario =  require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async( req, res = response) => {

    const { email, password } = req.body

    // Verificar que el usuario con el email exista
    const usuario = await Usuario.findOne({ email });
    if(!usuario){
        return res.status(400).json({
            ok : false,
            msg : 'Email o contraseña incorrecto/a - email'
        })
    }

    // Validar que el usuario que intenta hacer login este valido
    if(!usuario.estado){
        return res.status(400).json({
            ok : false,
            msg : 'Email o contraseña incorrecto/a - estado :  false'
        })
    }

    // Comprobar contraseña
    const validPass = bcrypt.compareSync(password, usuario.password)
    if(!validPass){
        return res.status(400).json({
            ok : false,
            msg : 'Email o contraseña incorrecto/a - password'
        })
    }

    // Generar JWT
    const token = await generarJWT(usuario.id)
    res.json({
        usuario,
        token
    })
}

module.exports = {
    login
}