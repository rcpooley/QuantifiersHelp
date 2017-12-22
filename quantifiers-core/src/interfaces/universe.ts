import {IPredicate} from "./predicate";
import {IDomain} from "./domain";
import {IDataSet} from "./dataset";

export interface IUniverse {
    id: string;
    domains: {[domainVar: string]: IDomain};
    predicates: {[predicateName: string]: IPredicate};
    dataSets: {[dataSetID: string]: IDataSet}
}