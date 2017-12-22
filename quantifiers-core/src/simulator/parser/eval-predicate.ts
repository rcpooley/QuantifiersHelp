import {Evaluateable} from "./evaluateable";
import {IUniverse, IDataSet, IVariableState} from "../../interfaces";

export class EvalPredicate implements Evaluateable {

    private predicateName: string;
    private vars: string[];

    constructor(predicate: string) {
        let args = predicate.substring(1, predicate.length - 1).split(',');
        this.predicateName = args[0];
        this.vars = args.slice(1);
    }

    evaluate(universe: IUniverse, dataSet: IDataSet, variableState: IVariableState): boolean {
        let evalStr = universe.predicates[this.predicateName].evaluate;
        return EvalPredicate.doEval(evalStr, this.vars, dataSet, variableState);
    }

    private static doEval(evalStr: string, vars: string[], dataSet: IDataSet, variableState: IVariableState): boolean {
        //TODO predicate eval
        return false;
    }
}