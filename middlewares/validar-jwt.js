const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: `Es necesario enviar token por las cabeceras del request`
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        const usuario = await Usuario.findById(uid)

        // Verificar que el usuario del token existant
        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: `Token invalido - el usuario no existe`
            })
        }

        // Verificar que el estado del usuario sea true
        if (!usuario.estado) {
            return res.status(401).json({
                ok: false,
                msg: `Token invalido - estado false`
            })
        }

        req.usuario = usuario;

        next();

    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: `Token invalido`
        })
    }
}


module.exports = {
    validarJWT
}