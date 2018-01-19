export interface IProblem {
    id: string;
    prompt: string;
    solution: string;
    solutions?: {[dataSetID: number]: boolean};
}