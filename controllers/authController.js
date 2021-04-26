const { response } = require("express");
const Usuario =  require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require('../helpers/verificar-google')

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

const googleSignIn = async(req, res = response ) =>{
    const { id_token } = req.body

    const { email, nombre, img} = await googleVerify( id_token )

    let usuario = await Usuario.findOne({ email });

    console.log(usuario);

    if(!usuario){
        // crear usuario
        const data = { 
            nombre,
            email,
            password : 'xd',
            img,
            google : true,
            rol : 'USER_ROL'
        }

        usuario = new Usuario( data )
        await usuario.save();
    }

    if( !usuario.estado ){
        return res.status(401).json({
            ok : false,
            msg : "Acceso denegado, usuario bloqueado"
        })
    }

    
    return res.json({
        msg : "login with google ok!",
        usuario
    })
}

module.exports = {
    login,
    googleSignIn
}