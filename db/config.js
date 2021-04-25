const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.MONGO_CNN, {
            useCreateIndex : true,
            useNewUrlParser : true,
            useFindAndModify : false,
            useUnifiedTopology : true
        })
        console.log("Base de datos online");
    } catch ( err ) {
        console.log(err);
        throw new Error('Error al conectar la base de datos')
    }
}


module.exports = {
    dbConnection
}