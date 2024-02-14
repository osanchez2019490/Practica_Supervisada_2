const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
    constructor (){
        this.app = express();
        this.port = process.env.PORT;
        this.estudianteRegisterPath = '/api/estudianteRegister';
        this.profesorRegisterPath = '/api/profesorRegister';
        this.login = '/api/auth';
        this.editarEstudiante = '/api/estudiante';
        
        this.conectarDB();
        this.middlware();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }
    
    middlware(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.estudianteRegisterPath, require('../routers/estudianteRegister.routes'));
        this.app.use(this.profesorRegisterPath, require('../routers/profesorRegister.routes'));
        this.app.use(this.login, require('../routers/auth.routes'));
        this.app.use(this.editarEstudiante, require('../routers/estudiante.routes'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor ejecutandose y escuchando el puerto', this.port);
        });
    };


}

module.exports = Server;