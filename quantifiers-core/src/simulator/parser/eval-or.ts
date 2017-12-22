import {Evaluateable} from "./evaluateable";

export class EvalOr implements Evaluateable {

    constructor(private a: Evaluateable, private b: Evaluateable) {
    }

    evaluate(...args) {
        return this.a.evaluate(...args) || this.b.evaluate(...args);
    }
}