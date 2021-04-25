const { Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre : {
        type: String,
        required : [true,'El nombre es obligatorio']
    },
    email : {
        type: String,
        required : [true,'El email es obligatorio'],
        unique : true
    },
    password : {
        type: String,
        required : [true,'El contraseña es obligatorio']
    },
    img : {
        type: String,
        default : ""
    },
    rol : {
        type: String,
        required : true,
        enum : ['ADMIN_ROL','USER_ROL']
    },
    estado : {
        type: Boolean,
        default : true
    },
    google : {
        type: Boolean,
        default : false
    },
});

UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario
}
module.exports = model('Usuario', UsuarioSchema)