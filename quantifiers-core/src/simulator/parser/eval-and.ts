import {Evaluateable} from "./evaluateable";

export class EvalAnd implements Evaluateable {

    constructor(private a: Evaluateable, private b: Evaluateable) {
    }

    evaluate(...args): boolean {
        return this.a.evaluate(...args) && this.b.evaluate(...args);
    }
}