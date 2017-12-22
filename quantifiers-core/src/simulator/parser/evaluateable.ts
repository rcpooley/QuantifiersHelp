import {IUniverse, IDataSet, IVariableState} from "../../interfaces";

export interface Evaluateable {
    evaluate: {
        (universe: IUniverse, dataSet: IDataSet, variableState: IVariableState): boolean;
        (...args: any[]): boolean
    };
}