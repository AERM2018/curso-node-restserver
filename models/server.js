const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const usuariosRouter = require('../routes/usuarios');
const { dbConnection } = require('../db/config');
const authRouter = require('../routes/auth');
const categoriasRouter = require('../routes/categorias');
const productosRouter = require('../routes/productos');
const buscarRouter = require('../routes/buscar');
const uploadsRouter = require('../routes/uploads');


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT
    this.paths = {
      authPath: '/api/auth',
      usuariosPath: '/api/usuarios',
      categoriasPath: '/api/categorias',
      productosPath: '/api/productos',
      buscarPath: '/api/buscar',
      uploadsPath: '/api/uploads',
    };

    // Conectar base de datos
    this.conectarDB()

    // Middlewares
    this.middlewares();

    //   Rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {

    // Lectura y parseo del body
    this.app.use(express.json());

    // CORS
    this.app.use(cors());

    // Directorio publico
    this.app.use(express.static('public'))

    // Subir archivos
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath :  true
    }));
  }

  routes() {

    this.app.use(this.paths.usuariosPath, usuariosRouter)
    this.app.use(this.paths.authPath, authRouter)
    this.app.use(this.paths.categoriasPath, categoriasRouter)
    this.app.use(this.paths.productosPath, productosRouter)
    this.app.use(this.paths.buscarPath, buscarRouter)
    this.app.use(this.paths.uploadsPath, uploadsRouter)

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server escuchando en el puerto ${this.port}`);
    })
  }
}

module.exports = Server;