import {IUniverse} from "./universe";
import {IProblem} from "./problem";

export interface IPracticeSet {
    universe: IUniverse;
    problems: {[problemID: number]: IProblem};
}