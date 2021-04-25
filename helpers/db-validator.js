const Rol = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async ( rol = '' ) => {
    const rolDB = await Rol.findOne({ rol });
    if (!rolDB) {
        throw new Error(`El rol ${rol} no esta registrado`)
    }
}

const emailExiste = async( email = '') => {
    const usuarioDB = await Usuario.findOne({ email });
    if (usuarioDB) {
            throw new Error(`Ya se encuentra registrado el email ${email}`)
    }
}

const usuarioExiste = async( id = '') => {
    const usuarioDB = await Usuario.findById(id) 
    if (!usuarioDB) {
            throw new Error(`El usuario con id ${id} no existe`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    usuarioExiste
}