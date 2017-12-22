import {Simulator} from "../../app/controller/simulator";
import {Evaluateable} from "../../app/controller/parser/evaluateable";
import {EvalPredicate} from "../../app/controller/parser/eval-predicate";
import {EvalOr} from "../../app/controller/parser/eval-or";
import {EvalAnd} from "../../app/controller/parser/eval-and";
import {EvalNot} from "../../app/controller/parser/eval-not";
import {EvalEqual} from "../../app/controller/parser/eval-equal";
import {EvalQuantifier} from "../../app/controller/parser/eval-quantifier";
import {EvalImplies} from "../../app/controller/parser/eval-implies";

interface OpenSim {
    parseSolution: (text: string) => Evaluateable;
}

describe('Simulator.parseSolution', () => {
    let tmpSim: any = new Simulator();

    let simulator: OpenSim = tmpSim;

    let testStrings = {};
    let testSolutions = {};

    testStrings['predicate'] = '{P,[T,x,y]}';
    testSolutions['predicate'] = new EvalPredicate('[T,x,y]');

    testStrings['or'] = '{v,' + testStrings['predicate'] + ',' + testStrings['predicate'] + '}';
    testSolutions['or'] = new EvalOr(testSolutions['predicate'], testSolutions['predicate']);

    testStrings['and'] = '{^,' + testStrings['or'] + ',' + testStrings['or'] + '}';
    testSolutions['and'] = new EvalAnd(testSolutions['or'], testSolutions['or']);

    testStrings['notequal'] = '{≠,(x0),(x1)}';
    testSolutions['notequal'] = new EvalNot(new EvalEqual('(x0)', '(x1)'));

    testStrings['equal'] = '{=,(x0),(x1)}';
    testSolutions['equal'] = new EvalEqual('(x0)', '(x1)');

    testStrings['forall'] = '{∀,(x),' + testStrings['and'] + '}';
    testSolutions['forall'] = new EvalQuantifier(true, '(x)', testSolutions['and']);

    testStrings['exists'] = '{∃,(y),' + testStrings['forall'] + '}';
    testSolutions['exists'] = new EvalQuantifier(false, '(y)', testSolutions['forall']);

    testStrings['not'] = '{¬,' + testStrings['exists'] + '}';
    testSolutions['not'] = new EvalNot(testSolutions['exists']);

    testStrings['implies'] = '{→,' + testStrings['not'] + ',' + testStrings['exists'] + '}';
    testSolutions['implies'] = new EvalImplies(testSolutions['not'], testSolutions['exists']);

    Object.keys(testStrings).forEach(test => {
        it(`should handle ${test}`, () => {
            expect(simulator.parseSolution(testStrings[test])).toEqual(testSolutions[test]);
        });
    });
});