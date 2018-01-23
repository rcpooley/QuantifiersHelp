import {Component, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {Util} from "quantifiers-core/dist/util";

@Component({
    selector: 'admin-practiceset',
    templateUrl: 'admin-practiceset.component.html',
    styleUrls: ['admin-practiceset.component.css']
})
export class AdminPracticesetComponent implements OnInit {

    private universe: any;

    input: string;
    truthMap: any;

    constructor(private main: MainService) {
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

        let truths = this.universe.dataSets.ppesw.predicateTruth.split('\n');

        truths.forEach(truth => {
            let spl = truth.split(' ');
            if (spl[0].toLowerCase() == 'for') {

            } else {
                let openParenIdx = truth.indexOf('(');
                let closeParenIdx = Util.getClosingIndex(truth, openParenIdx);
                let argStr = truth.substring(openParenIdx + 1, closeParenIdx);
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
                this.truthMap[truth] = args;
            }
        });
    }

    parseInput() {
        let inp = this.input;
        this.input = inp.toUpperCase();
        console.log(this.truthMap);
    }
}
