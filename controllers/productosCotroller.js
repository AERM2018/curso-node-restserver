const { response } = require("express")
const { Producto } = require("../models")

const getProductos = async(req, res = response) => {
    const { limite = 5, desde = 0} = req.query;
    const query = { estado: true }

    try {
        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
        ])
        res.json({
            ok: true,
            total,
            productos
        });
    } catch ( err ) {
        console.log(err);
        res.status(500).json({
            ok : false,
            msg: 'Hable con el administrador',
        })
    }
    
}
const getProductoById = async(req, res = response) => {

    const { id } = req.params
    try {
   
        const producto = await Producto.findById( id )
                                .populate('usuario','nombre')
                                .populate('categoria','nombre')
        res.json({
            ok: true,
            producto
        });
    } catch ( err ) {
        console.log(err);
        res.status(500).json({
            ok : false,
            msg: 'Hable con el administrador',
        })
    }
    
}
const postProducto = async(req, res = response) => {

    const  {nombre, estado, ...data}  = req.body
    data.nombre = nombre.toUpperCase()


    try {
        
        const productoDB = await  Producto.findOne({ nombre : data.nombre })
    
        if( productoDB ){
            return res.status(400).json({
                msg : `El producto ${ nombre } ya existe`
            })
        };
    
        // Generar data a guardar
        const dataToDB = { 
            ...data,
            usuario : req.usuario.toJSON().uid
        }
    
        const producto = new Producto( dataToDB );
        await producto.save();
    
        res.status(201).json({
            msg: 'Producto creada correctamente',
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
const putProducto = async(req, res = response) => {

    let { estado , nombre, ...data } = req.body;
    const { id } = req.params;

    data.nombre = nombre.toUpperCase();
    data.usuario =  req.usuario.uid

    await Producto.findByIdAndUpdate( id, data, { new: true } )
    res.json({
        msg: 'Producto actualizado correctamente'
    })
}

const deleteProducto = async(req, res = response) => {
    const { id } = req.params
    try {
   
        const producto = await Producto.findByIdAndUpdate( id, {estado : false} )
        res.json({
            ok: true,
            producto
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
    getProductos,
    getProductoById,
    postProducto,
    putProducto,
    deleteProducto
  
}