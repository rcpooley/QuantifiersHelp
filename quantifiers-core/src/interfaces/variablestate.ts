export interface IVariableState {
    variables: {[domainVar: string]: {[domainNum: number]: string}};//Maps to dataEntryID
    clone: () => IVariableState;
}