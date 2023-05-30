import express from 'express';
import cors from 'cors';
import { socketController } from '../sockets/controller.js'

//import for sockets
import { createServer } from 'http';
import { Server as ServerSocket } from 'socket.io';
 

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Socket config to use 
    this.serverSocketIo = createServer(this.app)
    this.io = new ServerSocket(this.serverSocketIo);  

    this.paths = {}

    //Middlewares    
    this.middlewares();

    //Routes
    this.routes();

    //Sockets
    this.socketsEvents();

  }

  middlewares() {

    //Cors
    this.app.use(cors());

    // Public folder
    this.app.use(express.static("public"));

  }

  routes() {};

  socketsEvents(){
    
    this.io.on('connection', socketController);
  };

  listen() {
    this.serverSocketIo.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  };
}