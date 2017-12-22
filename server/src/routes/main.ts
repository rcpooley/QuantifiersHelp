import * as express from 'express';
import {Web} from "../web";
import {Database} from "../database";

export class MainRoute {

    public router: express.Router;
    private database: Database;

    constructor(web: Web) {
        this.router = express.Router();
        this.database = web.getDatabase();
    }
}