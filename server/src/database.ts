import {MongoClient, Db, ObjectID} from "mongodb";
import {IUniverse} from "quantifiers-core/dist/interfaces";
import {Util} from "quantifiers-core/dist/util";

const RETRY_DELAY = 5000;

const COLLECTION_UNIVERSE = 'universes';

function OID(id: string): ObjectID {
    try {
        return new ObjectID(id);
    } catch (e) {
        return new ObjectID();
    }
}

export class Database {

    private db: Db;
    private readyCallback: Function;

    constructor(readyCallback?: Function) {
        this.readyCallback = readyCallback;
        this.connect(0);
    }

    private connect(timeout: number) {
        setTimeout(() => {
            MongoClient.connect('mongodb://localhost:27017/quantifiershelp', (err, db: Db) => {
                if (err) {
                    console.error(`Could not connect to mongodb server, retrying in ${RETRY_DELAY} millis`, err);
                    this.connect(RETRY_DELAY);
                    return;
                }

                this.db = db;

                if (this.readyCallback) {
                    this.readyCallback();
                    this.readyCallback = null;
                }

                console.log('Connected to mongodb server');

                db.on('close', () => {
                    this.db = null;
                    console.log(`Disconnected from mongodb server, connecting in ${RETRY_DELAY} millis`);
                    this.connect(RETRY_DELAY);
                });
            });
        }, timeout);
    }

    private doFind(collection: string, filter: any, callback: Function) {
        if (this.db == null) {
            return;
        }

        this.db.collection(collection).find(filter).toArray((err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    private doUpdate(collection: string, query: any, update: any, callback?: Function) {
        if (this.db == null) {
            return;
        }

        this.db.collection(collection).update(query, update, (err, result) => {
            if (err) throw err;
            if (callback) callback(result);
        });
    }

    private doInsert(collection: string, obj: any, callback?: Function): void {
        if (this.db == null) {
            return;
        }

        this.db.collection(collection).insert(obj, (err, result) => {
            if (err) throw err;
            if (callback) callback(result);
        });
    }

    private doDelete(collection: string, query: any, callback?: Function): void {
        if (this.db == null) {
            return;
        }

        this.db.collection(collection).deleteMany(query, (err, result) => {
            if (err) throw err;
            if (callback) callback(result);
        });
    }

    private makeUniverse(obj: any): IUniverse {
        let clone = Util.clone(obj);
        clone.id = clone._id;
        delete clone._id;
        return clone;
    }

    public getUniverses(callback: (universes: IUniverse[]) => void): void {
        this.doFind(COLLECTION_UNIVERSE, {}, universes => {
            callback(universes.map(uni => this.makeUniverse(uni)));
        });
    }

    public getUniverse(id: string, callback: (universe: IUniverse) => void): void {
        this.doFind(COLLECTION_UNIVERSE, {_id: OID(id)}, result => {
            if (result.length == 0) {
                callback(null);
            } else {
                callback(result[0]);
            }
        });
    }

    public updateUniverse(universe: IUniverse): void {
        let obj = Util.clone(universe);
        delete obj['id'];
        this.doUpdate(COLLECTION_UNIVERSE, {_id: OID(universe.id)}, obj);
    }

    public createUniverse(callback: (universe: IUniverse) => void): void {
        this.doInsert(COLLECTION_UNIVERSE, {
            domains: {},
            predicates: {},
            dataSets: {}
        }, result => {
            callback(this.makeUniverse(result.ops[0]));
        });
    }

    public deleteUniverse(id: string): void {
        this.doDelete(COLLECTION_UNIVERSE, {_id: OID(id)});
    }
}