const { response } = require("express")
const { Categoria } = require("../models")

const getCategorias = async(req, res = response) => {
    const { limite = 5, desde = 0} = req.query;
    const query = { estado: true }

    try {
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('usuario')
        ])
        res.json({
            ok: true,
            total,
            categorias
        });
    } catch ( err ) {
        console.log(err);
        res.status(500).json({
            ok : false,
            msg: 'Hable con el administrador',
        })
    }
    
}
const getCategoriaById = async(req, res = response) => {

    const { id } = req.params
    try {
   
        const categoria = await Categoria.findById( id )
                                .populate('usuario','nombre')
        res.json({
            ok: true,
            categoria
        });
    } catch ( err ) {
        console.log(err);
        res.status(500).json({
            ok : false,
            msg: 'Hable con el administrador',
        })
    }
    
}
const postCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    try {
        
        const categoriaDB = await  Categoria.findOne({ nombre })
    
        if( categoriaDB ){
            return res.status(400).json({
                msg : `La categoría ${ nombre } ya existe`
            })
        };
    
        // Generar data a guardar
        const data = { 
            nombre,
            usuario : req.usuario.toJSON().uid
        }
    
        const categoria = new Categoria( data );
        await categoria.save();
    
        res.status(201).json({
            msg: 'Categoria creada correctamente',
            nombre: nombre
        })
    } catch ( err ) {
        console.log(err);
        res.status(500).json({
            ok : false,
            msg: 'Hable con el administrador',
        })
    }
}
const putCategoria = async(req, res = response) => {

    let { estado, usuario, ...data } = req.body;
    const { id } = req.params;

    data.nombre = data.nombre.toUpperCase();
    data.usuario =  req.usuario.toJSON().uid

    await Categoria.findByIdAndUpdate( id, data )
    res.json({
        msg: 'Categoria actualizada correctamente'
    })
}
const deleteCategoria = async(req, res = response) => {
    const { id } = req.params
    try {
   
        const categoria = await Categoria.findByIdAndUpdate( id, {estado : false} )
        res.json({
            ok: true,
            categoria
        });
    } catch ( err ) {
        console.log(err);
        res.status(500).json({
            ok : false,
            msg: 'Hable con el administrador',
        })
    }
    
}

module.exports = {
    getCategorias,
    getCategoriaById,
    postCategoria,
    putCategoria,
    deleteCategoria,
}