const { response } = require("express")
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { uploadFiles } = require("../helpers/upload");
const { Usuario, Producto } = require("../models")

const cargarArchivos = async (req, res = response) => {

    try {
        const nombre = await uploadFiles(req.files, undefined, 'imgs')

        res.json({ nombre });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            err
        })
    }
}

// const actualizarImagen = async (req, res = response) => {

//     const { id, coleccion } = req.params;

//     let modelo;

//     try {
//         switch (coleccion) {
//             case 'usuarios':
//                 modelo = await Usuario.findById(id)
//                 if (!modelo) {
//                     return res.status(404).json({
//                         ok: false,
//                         msg: `El usuario con id ${id} no existe`
//                     })
//                 }
//                 break;
//             case 'productos':
//                 modelo = await Producto.findById(id)
//                 if (!modelo) {
//                     return res.status(404).json({
//                         ok: false,
//                         msg: `El producto con id ${id} no existe`
//                     })
//                 }
//                 break;

//             default:
//                 return res.status(500).json({
//                     ok: false,
//                     msg: `Se me olvido programar eso`
//                 })
//         }

//         if (modelo.img) {
//             const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img)
//             if (fs.existsSync(pathImg)) {
//                 fs.unlinkSync(pathImg)
//             }
//         }

//         const nombre = await uploadFiles(req.files, undefined, coleccion)
//         modelo.img = nombre
//         await modelo.save()

//         return res.status(200).json({
//             ok: true,
//             msg: 'Imagen actualizada correctamente'
//         })

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             ok: false,
//             err
//         })
//     }

// }

const actualizarImagenCloudinary = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    try {
        switch (coleccion) {
            case 'usuarios':
                modelo = await Usuario.findById(id)
                if (!modelo) {
                    return res.status(404).json({
                        ok: false,
                        msg: `El usuario con id ${id} no existe`
                    })
                }
                break;
            case 'productos':
                modelo = await Producto.findById(id)
                if (!modelo) {
                    return res.status(404).json({
                        ok: false,
                        msg: `El producto con id ${id} no existe`
                    })
                }
                break;

            default:
                return res.status(500).json({
                    ok: false,
                    msg: `Se me olvido programar eso`
                })
        }

        if (modelo.img) {
            return res.json({
                src
            })
            // TODO: Como borrar la imagen de cloudinary
            const imagenArr = modelo.img.split('/')
            const fileName  = imagenArr[ imagenArr.length - 1 ]
            const [ public_id ] = fileName.split('.')
            cloudinary.uploader.destroy( public_id )
        }

        const {secure_url} = await cloudinary.uploader.upload( req.files.archivo.tempFilePath )
        modelo.img = secure_url
        await modelo.save()

        return res.status(200).json({
            ok: true,
            msg: 'Imagen actualizada correctamente',
            modelo
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            err
        })
    }

}
const obtenerImagen = async ( req, res = response ) => {
    const { id, coleccion } = req.params;

    let modelo;

    try {
        switch (coleccion) {
            case 'usuarios':
                modelo = await Usuario.findById(id)
                if (!modelo) {
                    return res.status(404).json({
                        ok: false,
                        msg: `El usuario con id ${id} no existe`
                    })
                }
                break;
            case 'productos':
                modelo = await Producto.findById(id)
                if (!modelo) {
                    return res.status(404).json({
                        ok: false,
                        msg: `El producto con id ${id} no existe`
                    })
                }
                break;

            default:
                return res.status(500).json({
                    ok: false,
                    msg: `Se me olvido programar eso`
                })
        }

        let pathImg;
        if (modelo.img) {
            pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img)
            if (fs.existsSync(pathImg)) {
                return res.sendFile( pathImg )
            }
        }

        pathImg = path.join(__dirname, '../assets', 'no-image.jpg')
        return res.sendFile( pathImg )

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            err
        })
    }

}
module.exports = {
    cargarArchivos,
    actualizarImagenCloudinary,
    obtenerImagen
}