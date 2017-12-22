import {IDataEntry} from "./dataentry";

export interface IDataSet {
    id: string;
    entries: {[domainVar: string]: {[dataEntryID: number]: IDataEntry}};
}