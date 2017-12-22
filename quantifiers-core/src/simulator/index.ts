import {Evaluateable, EvalPredicate, EvalOr, EvalAnd, EvalEqual, EvalNot, EvalQuantifier, EvalImplies} from "./parser";
import {Util} from "../util";

export class Simulator {

    public evaluate(): boolean {
        return false;
    }

    //Assume text is correctly formatted (starts and ends with {} respectively)
    private parseSolution(text: string): Evaluateable {
        let commaIdx = text.indexOf(',');
        let op = text.substring(1, commaIdx);

        let args = [];

        while (text.charAt(commaIdx) != '}') {
            let openIdx = commaIdx + 1;
            let closeIdx = Util.getClosingIndex(text, openIdx);
            args.push(text.substring(openIdx, closeIdx + 1));
            commaIdx = closeIdx + 1;
        }

        switch (op) {
            case 'P':
                return new EvalPredicate(args[0]);
            case 'v':
                return new EvalOr(this.parseSolution(args[0]), this.parseSolution(args[1]));
            case '^':
                return new EvalAnd(this.parseSolution(args[0]), this.parseSolution(args[1]));
            case '≠':
                return new EvalNot(new EvalEqual(args[0], args[1]));
            case '=':
                return new EvalEqual(args[0], args[1]);
            case '∀':
                return new EvalQuantifier(true, args[0], this.parseSolution(args[1]));
            case '∃':
                return new EvalQuantifier(false, args[0], this.parseSolution(args[1]));
            case '¬':
                return new EvalNot(this.parseSolution(args[0]));
            case '→':
                return new EvalImplies(this.parseSolution(args[0]), this.parseSolution(args[1]));
        }

        return null;
    }
}