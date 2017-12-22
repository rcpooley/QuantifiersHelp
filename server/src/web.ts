import * as express from 'express';
import http = require('http');
import bodyParser = require("body-parser");
import * as socketIO from 'socket.io';
import {Database} from "./database";
import {MainRoute} from "./routes/main";
import {DataSync} from "./datasync";

let config = require('./config.json');

export class Web {
    private app: express.Application;
    private server: http.Server;
    private io: SocketIO.Server;
    private database: Database;
    private datasync: DataSync;

    constructor() {
        this.setupDatabase(() => {
            this.initDataSync();
        });
        this.createApp();
        this.middleware();
        this.routes();
        this.createServer();
        this.socketIO();
    }

    private setupDatabase(callback?: Function) {
        this.database = new Database(callback);
    }

    private createApp() {
        this.app = express();
    }

    private middleware() {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
    }

    private routes() {
        this.app.use('/api', new MainRoute(this).router);

        this.app.get('*', (req, res) => {
            res.send('Hello world2!');
        });
    }

    private createServer() {
        this.server = new http.Server(this.app);
    }

    private socketIO() {
        this.io = socketIO(this.server);
    }

    private initDataSync() {
        this.datasync = new DataSync(this);
    }

    public start() {
        this.server.listen(config.port, () => {
            console.log(`Listening on *:${config.port}`);
        });

        this.io.on('connect', (socket: SocketIO.Socket) => {
            this.datasync.addSocket(socket);
        });
    }

    public getDatabase(): Database {
        return this.database;
    }
}