const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFiles = (files, extensionesValidas = ['jpg', 'png', 'gif', 'jpeg'], carpeta = '') => {
    return new Promise((resolve, reject) => {
       
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1]

        if (!extensionesValidas.includes(extension)) {
            reject(`La extension ${extension} no esta permitida, ${extensionesValidas}`)
        }

        const nombreTmp = `${uuidv4()}.${extension}`
        archivoPath = path.join(__dirname, '../uploads/', carpeta, nombreTmp);

        archivo.mv(archivoPath, (err) => {
            if (err) {
                reject(err)
            }
        });

        resolve(nombreTmp)
    })
}


module.exports = {
    uploadFiles
}