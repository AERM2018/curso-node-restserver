const {Usuario, Categoria, Rol, Producto} = require('../models/');

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

const categoriaExiste = async( id = '') => {
    const categoriaDB = await Categoria.findById(id) 
    if (!categoriaDB) {
            throw new Error(`La categoria con id ${id} no existe`)
    }
}

const productoExiste = async( id = '') => {
    const productoDB = await Producto.findById(id) 
    if (!productoDB) {
            throw new Error(`El producto con id ${id} no existe`)
    }
}

const inColeccionesPermitidas = ( coleccion = '', coleccionesPermitidas = []) => {
    const valida = coleccionesPermitidas.includes( coleccion );

    if(!valida) {
        throw new Error(`Coleccion ${ coleccion } no es permitida`)
    }

    return true;
}
module.exports = {
    esRolValido,
    emailExiste,
    usuarioExiste,
    categoriaExiste,
    productoExiste,
    inColeccionesPermitidas
}