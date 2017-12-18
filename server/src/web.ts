import * as express from 'express';
import http = require('http');
import bodyParser = require("body-parser");
import {Express} from "express-serve-static-core";

let config = require('./config.json');

export class Web {
    private server: Express;
    private httpServer: http.Server;

    constructor() {
        this.server = express();
        this.middleware();
        this.routes();

        this.httpServer = new http.Server(this.server);
    }

    private middleware() {
        this.server.use(bodyParser.urlencoded({extended: true}));
        this.server.use(bodyParser.json());
    }

    private routes() {
        this.server.get('*', (req, res) => {
            res.send('Hello world2!');
        });
    }

    public start() {
        this.httpServer.listen(config.port, () => {
            console.log(`Listening on *:${config.port}`);
        });
    }
}