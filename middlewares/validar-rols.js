const { request, response } = require("express");

const esAdminRol = ( req = request, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            ok : false,
            msg : `Se trata de validar rol antes de validar JWT`
        })
    }

    const { rol, nombre} = req.usuario

    if( rol !== 'ADMIN_ROL'){
        return res.status(500).json({
            ok : false,
            msg : `El usuario ${ nombre } no es administrador no puede hacer esto`
        })
    }

    next();
}

const verificarRols = ( ...rols ) => {
    return ( req, res = response, next) => {
        if(!req.usuario){
            return res.status(500).json({
                ok : false,
                msg : `Se trata de validar rol antes de validar JWT`
            })
        }

        const { rol, nombre } = req.usuario

        if( !rols.includes( rol ) ){
            return res.status(500).json({
                ok : false,
                msg : `El usuario ${ nombre } no tiene permisos para ejecutar la acción especificada`
            })
        }

        next();
    }
}

module.exports = {
    esAdminRol,
    verificarRols
}