import {DataStoreServer, DataSocket} from "datasync-js";
import {Web} from "./web";
import {Database} from "./database";

export class DataSync {

    private database: Database;
    private dsServer: DataStoreServer;

    constructor(web: Web) {
        this.database = web.getDatabase();

        this.setupServer();
        this.serveUniverse();
    }

    public addSocket(socket: SocketIO.Socket): void {
        let sock = DataSocket.fromSocket(socket);

        this.dsServer.addSocket(sock);

        socket.on('disconnect', () => {
            this.dsServer.removeSocket(sock);
        });
    }

    private setupServer() {
        this.dsServer = new DataStoreServer()
            .serveGlobal('store');
        let store = this.dsServer.getStore('store');
    }

    public static getTopPath(path: string): string {
        if (path == null) {
            return null;
        }

        let idx = path.substring(1).indexOf('/');

        if (idx == -1) {
            return path;
        } else {
            return path.substring(0, idx + 1);
        }
    }

    private serveUniverse() {
        let store = this.dsServer.getStore('store');
        let ref = store.ref('/universe');

        let updateUni = uni => {
            ref.ref('/' + uni.id).update(uni);
        };

        store.ref('/universe-create').on('updateDirect', value => {
            this.database.createUniverse(uni => {
                Object.keys(value).forEach(key => {
                    uni[key] = value[key];
                });
                updateUni(uni);
            });
        });

        ref.on('updateChild', (value, path, flags) => {
            if (flags.indexOf('init') >= 0) {
                return;
            }

            let topPath = DataSync.getTopPath(path);

            ref.ref(topPath).value(uni => {
                if (uni == null) {
                    this.database.deleteUniverse(topPath.substring(1));
                    return;
                }

                this.database.updateUniverse(uni);
            });
        });

        this.database.getUniverses(unis => {
            unis.forEach(uni => updateUni(uni));
        });
    }
}