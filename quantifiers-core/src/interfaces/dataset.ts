export interface IDataSet {
    id: string;
    entryNum: {[domainVar: string]: number};
    predicateTruth: string;
}