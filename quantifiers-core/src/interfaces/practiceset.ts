import {IProblem} from "./problem";

export interface IPracticeSet {
    universeID: string;
    problems: {[problemID: number]: IProblem};
}