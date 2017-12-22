import {Evaluateable} from "./evaluateable";

export class EvalNot implements Evaluateable {

    constructor(private a: Evaluateable) {
    }

    evaluate(...args): boolean {
        return !this.a.evaluate(...args);
    }
}