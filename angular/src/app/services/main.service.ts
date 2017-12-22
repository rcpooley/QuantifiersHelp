import {Injectable} from "@angular/core";
import * as socketIO from 'socket.io-client';
import {DataStoreClient, DataSocket, DataStore} from "datasync-js";

const SERVER_URL = 'http://localhost:80';

@Injectable()
export class MainService {

    private socket: SocketIOClient.Socket;
    private client: DataStoreClient;

    constructor() {
        this.socket = socketIO(SERVER_URL);
        this.client = new DataStoreClient();

        this.socket.on('connect', () => {
            let sock = DataSocket.fromSocket(this.socket);
            this.client.setSocket(sock)
                .connectStore('store');
        });
    }

    public getStore(): DataStore {
        return this.client.getStore('store');
    }
}