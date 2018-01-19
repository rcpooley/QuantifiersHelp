import {Evaluateable} from "./evaluateable";
import {Util} from "../../util";
import {IUniverse, IDataSet, IVariableState} from "../../interfaces";

export class EvalQuantifier implements Evaluateable {

    private domainVar: string;
    private domainNum: number;

    constructor(private forall: boolean,
                private var0: string,
                private evall: Evaluateable) {
        let varnum = Util.splitStringNumber(this.var0);
        this.domainVar = varnum[0];
        this.domainNum = varnum[1];
    }

    evaluate(universe: IUniverse, dataSet: IDataSet, variableState: IVariableState): boolean {
        let dsEntryNum = dataSet.entryNum[this.domainVar];

        for (let i = 0; i < dsEntryNum; i++) {
            let newState = variableState.clone();
            newState.variables[this.domainVar][this.domainNum] = i;

            let out = this.evall.evaluate(universe, dataSet, newState);
            if (out && !this.forall) {
                return true;
            }
            if (!out && this.forall) {
                return false;
            }
        }

        //At this point all the entries were true if forall, or all the entries were false if there exists
        return this.forall;
    }
}