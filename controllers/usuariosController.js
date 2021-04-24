const { response } = require("express");

const usuariosGet = (req, res = response) => {

    const { q, name = 'No name'} = req.query

    res.json({
        msg : "get API - controlador",
        q,
        name
    });
}
const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg : "put API - controlador",
        id
    });
}
const usuariosPost = (req, res = response) => {
    res.json({
        msg : "post API - controlador"
    });
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg : "delete API - controlador"
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
}