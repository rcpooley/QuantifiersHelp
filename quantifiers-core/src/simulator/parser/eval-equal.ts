import {Evaluateable} from "./evaluateable";import {Util} from "../../util";
import {IUniverse, IDataSet, IVariableState} from "../../interfaces";

export class EvalEqual implements Evaluateable {

    constructor(private var0: string, private var1: string) {
    }

    evaluate(universe: IUniverse, dataSet: IDataSet, variableState: IVariableState): boolean {
        let varnum0 = Util.splitStringNumber(this.var0);
        let varnum1 = Util.splitStringNumber(this.var1);

        if (varnum0[0] != varnum1[0]) {
            return false;
        }

        let varState = variableState[varnum0[0]];

        return varState[varnum0[1]] == varState[varnum1[1]];
    }
}