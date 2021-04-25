const express = require('express');
const cors = require('cors');
const usuariosRouter = require('../routes/usuarios');
const { dbConnection } = require('../db/config')


class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT
    this.paths = {
      usuariosPath : '/api/usuarios'
    };

    // Conectar base de datos
    this.conectarDB()

    // Middlewares
    this.middlewares();

    //   Rutas
    this.routes();
  }

  async conectarDB(){
    await dbConnection();
  }

  middlewares(){

    // Lectura y parseo del body
    this.app.use( express.json() );
    
    // CORS
    this.app.use(cors());

    // Directorio publico
      this.app.use( express.static('public'))
  }

  routes(){

    this.app.use( this.paths.usuariosPath, usuariosRouter )

  }

  listen(){
    this.app.listen(this.port, () => {
        console.log(`Server escuchando en el puerto ${this.port}`);
    })
  }
}

module.exports = Server;