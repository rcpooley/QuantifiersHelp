export interface IProblem {
    id: string;
    prompt: string;
    solutions: {[dataSetID: number]: boolean};
}