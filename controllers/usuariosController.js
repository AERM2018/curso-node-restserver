const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        ok: true,
        total,
        usuarios
    });
}
const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { password, google, email, ...resto } = req.body

    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)
    res.json({
        msg: "put API - controlador",
        id
    });
}
const usuariosPost = async (req, res = response) => {
    const { nombre, email, password, rol } = req.body;

    const usuario = new Usuario({ nombre, email, password, rol })

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(usuario.password, salt)

    await usuario.save()
    res.json({
        ok: true,
        msg: "Usuario creado correctamente",
        usuario
    });
}
const usuariosDelete = async(req, res = response) => {

    const { id } = req.params

    await Usuario.findByIdAndUpdate( id, {estado : false} )

    res.json({
        ok : true,
        msg: `Usuario con id ${id} eliminado correctamente`,
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
}