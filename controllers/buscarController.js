const { response } = require("express")
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models')

const coleccionesValidas = [
    'usuarios',
    'productos',
    'categorias',
    'rols',
    
];

const buscarUsuario = async( termino = '', res = response ) => {
    let results;
    if( ObjectId.isValid( termino ) ){
        // Buscar usuario por su id
        results = await Usuario.findById( termino )

    }else{
        // Buscar usuario por emial o nombre
        const regex = new RegExp( termino, 'i')
        results = await Usuario.find({
            $or : [{ nombre : regex }, { email : regex }],
            $and : [{ estado : true }]
        })

    }


    return res.json({
        ok : true,
        results
    })
}


const buscarCategorias = async( termino = '', res = response ) => {
    let results;
    if( ObjectId.isValid( termino ) ){
        // Buscar usuario por su id
        results = await Categoria.findById( termino )

    }else{
        // Buscar usuario por emial o nombre
        const regex = new RegExp( termino, 'i')
        results = await Categoria.find({ nombre : regex, estado : true })
                    .populate('usuario', 'nombre')

    }


    return res.json({
        ok : true,
        results
    })
}

const buscarProductos = async( termino = '', res = response ) => {
    let results;
    if( ObjectId.isValid( termino ) ){
        // Buscar usuario por su id
        results = await Producto.findById( termino )

    }else{
        // Buscar usuario por emial o nombre
        const regex = new RegExp( termino, 'i')
        results = await Producto.find({ nombre : regex, estado : true })
                        .populate('categoria', 'nombre')
                        .populate('usuario', 'nombre')

    }


    return res.json({
        ok : true,
        results
    })
}

const buscar = ( req, res = response ) => {

    const { coleccion , termino } = req.params

    if(!coleccionesValidas.includes(coleccion)){
        return res.status(400).json({
            ok : false,
            msg : `Las colecciones validas son ${coleccionesValidas}`
        })
    }

    switch ( coleccion ) {
        case 'usuarios':
            buscarUsuario( termino, res )
            break;
        case 'productos':
            buscarProductos( termino, res )
            break;
        case 'categorias':
            buscarCategorias( termino, res )
            break;
        
        default: 
             res.status(500).json({
                ok : false,
                msg : 'Se me olvido hacer esa busqueda'
             })
    }
}

module.exports = {
    buscar
}