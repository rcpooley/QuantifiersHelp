export interface IVariableState {
    variables: {[domainVar: string]: {[domainNum: number]: number}};//Maps to dataEntryID
    clone: () => IVariableState;
}