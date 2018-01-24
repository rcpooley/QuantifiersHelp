import {Component, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {Util} from "quantifiers-core/dist/util";

interface ArgRange {
    variable: string;
    hasValue: (num: number) => boolean;
}

@Component({
    selector: 'admin-practiceset',
    templateUrl: 'admin-practiceset.component.html',
    styleUrls: ['admin-practiceset.component.css']
})
export class AdminPracticesetComponent implements OnInit {

    private universe: any;

    input: string;
    output: string;
    truthMap: any;

    constructor(private main: MainService) {
        this.input = '';
        this.output = '';
    }

    ngOnInit(): void {
        let store = this.main.getStore();

        store.ref('/universe').on('update', value => {
            if (!value) return;

            this.universe = value[Object.keys(value)[0]];
            this.buildTruthMap();
        }, true);
    }

    parseTruth() {
        let truth = this.universe.dataSets.ppesw.predicateTruth;
        return truth.split('\n');
    }

    private buildTruthMap() {
        this.truthMap = {};

        let getArray = predicateName => {
            if (!this.truthMap[predicateName]) {
                this.truthMap[predicateName] = [];
            }
            return this.truthMap[predicateName];
        };

        let truths = this.universe.dataSets.ppesw.predicateTruth.split('\n');

        truths.forEach(truth => {
            let spl = truth.split(' ');
            if (spl[0].toLowerCase() == 'for') {

            } else {
                let openParenIdx = truth.indexOf('(');
                let closeParenIdx = Util.getClosingIndex(truth, openParenIdx);
                let argStr = truth.substring(openParenIdx + 1, closeParenIdx);

                let predicateName = truth.substring(0, openParenIdx);
                let args = this.getArgs(argStr);

                getArray(predicateName).push(this.evalArgs(args));
            }
        });
    }

    private getArgs(argStr: string): string[] {
        let args = [];
        let curArg = '';
        for (let i = 0; i < argStr.length; i++) {
            let c = argStr.charAt(i);

            if (c == ',') {
                args.push(curArg);
                curArg = '';
            } else if (c == '[') {
                let close = Util.getClosingIndex(argStr, i);
                for (; i <= close; i++) {
                    curArg += argStr.charAt(i);
                }
                i--;
            } else {
                curArg += c;
            }
        }
        if (curArg.length > 0) {
            args.push(curArg);
        }
        return args;
    }

    private evalArgs(args: string[]): ArgRange[] {
        let ret = [];

        args.forEach(arg => {
            let spl = this.splitAlpha(arg);

            const valStr: string = spl[1];
            const val = parseInt(valStr);

            let obj: ArgRange = {
                variable: spl[0],
                hasValue: (num: number) => {
                    if (!isNaN(val)) {
                        return num === val;
                    } else {
                        if (valStr.startsWith('[') && valStr.endsWith(']')) {
                            let vals = valStr.substring(1, valStr.length - 1).split(',');
                            if (vals.length < 2 || vals.length > 3) {
                                throw 'Invalid argument param length: ' + arg;
                            } else {
                                let start = parseInt(vals[0]);
                                let stop = parseInt(vals[1]);
                                let inc = 1;
                                if (vals.length > 2) {
                                    inc = parseInt(vals[2]);
                                }

                                if (isNaN(start) || isNaN(stop) || isNaN(inc)) {
                                    throw 'Invalid argument integer: ' + arg;
                                } else {
                                    for (let i = start; i <= stop; i += inc) {
                                        if (i === num) {
                                            return true;
                                        }
                                    }
                                    return false;
                                }
                            }
                        } else {
                            throw 'Invalid argument type: ' + arg;
                        }
                    }
                }
            };

            ret.push(obj);
        });

        return ret;
    }

    private splitAlpha(arg: string): string[] {
        let alpha = 'abcdefghijklmnopqrstuvwxyz';
        let idx = 0;
        while (idx < arg.length && alpha.indexOf(arg.charAt(idx)) >= 0) {
            idx++;
        }
        return [arg.substring(0, idx), arg.substring(idx)];
    }

    parseInput() {
        this.output = 'Calculating...';

        let inp = this.input;

        let openParenIdx = inp.indexOf('(');
        let closeParenIdx = Util.getClosingIndex(inp, openParenIdx);
        let argStr = inp.substring(openParenIdx + 1, closeParenIdx);
        let args = this.getArgs(argStr);
        let predicateName = inp.substring(0, openParenIdx);

        let tests = this.truthMap[predicateName];

        let success = false;

        if (tests) {
            tests.forEach((test: ArgRange[]) => {
                if (test.length != args.length) {
                    this.output = 'Parameter mismatch';
                } else {
                    for (let i = 0; i < test.length; i++) {
                        let realArg = this.splitAlpha(args[i])[1];
                        if (!test[i].hasValue(parseInt(realArg))) return;
                    }
                    success = true;
                }
            });
            this.output = success ? 'True' : 'False';
        } else {
            this.output = 'Invalid predicate';
        }
    }
}
