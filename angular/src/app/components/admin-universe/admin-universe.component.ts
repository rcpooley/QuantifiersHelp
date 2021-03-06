import {Component} from '@angular/core';
import {MainService} from "../../services/main.service";
import {DataStore} from "datasync-js";
import {IUniverse} from "quantifiers-core/dist/interfaces";
import {Util} from "../../util";

@Component({
    selector: 'admin-universe',
    templateUrl: 'admin-universe.component.html',
    styleUrls: ['admin-universe.component.css']
})
export class AdminUniverseComponent {

    private store: DataStore;
    private universeMap: {[id: string]: IUniverse};

    constructor(private main: MainService) {
        this.universeMap = {};
    }

    ngOnInit(): void {
        this.store = this.main.getStore();

        this.store.ref('/universe').on('update', (value, path, flags) => {
            if (!value || flags.indexOf('local') >= 0) return;

            this.universeMap = value;
        }, true);
    }

    private getUniverses(): IUniverse[] {
        return Object.keys(this.universeMap).map(key => this.universeMap[key]);
    }

    private genKeys(obj: any): string[] {
        return Object.keys(obj);
    }

    saveUniverse(uni: IUniverse) {
        Object.keys(uni.predicates).forEach(name => {
            let pred = uni.predicates[name];
            pred.vars = pred.vars.filter(item => item.length > 0);
        });
        this.store.ref('/universe/' + uni.id).update(uni, ['local']);
    }

    reloadUniverse(uni: IUniverse) {
        this.store.ref('/universe/' + uni.id).value(val => {
            this.universeMap[uni.id] = val;
        });
    }

    deleteUniverse(uni: IUniverse) {
        if (!confirm('Are you sure?')) return;
        this.store.ref('/universe/' + uni.id).remove();
    }

    addUniverse() {
        this.store.ref('/universe-create').update(true);
    }

    deleteDomain(uni: IUniverse, dvar: string) {
        delete uni.domains[dvar];
    }

    addDomain(uni: IUniverse) {
        let dvar = prompt('Domain var');
        uni.domains[dvar] = {
            variable: dvar,
            description: ''
        };
    }

    addPredicate(uni: IUniverse) {
        let name = prompt('Predicate name');
        uni.predicates[name] = {
            name: name,
            vars: [],
            description: ''
        };
    }

    addVar(uni: IUniverse, name: string) {
        uni.predicates[name].vars.push('');
    }

    deletePredicate(uni: IUniverse, name: string) {
        delete uni.predicates[name];
    }

    addDataSet(uni: IUniverse) {
        let dsID = this.newDataSetID(uni);
        uni.dataSets[dsID] = {
            id: dsID,
            entryNum: {},
            predicateTruth: ''
        };
    }

    deleteDataSet(uni: IUniverse, dsID: string) {
        delete uni.dataSets[dsID];
    }

    private newDataSetID(uni: IUniverse): string {
        let curIDs = Object.keys(uni.dataSets);
        let newID;
        do {
            newID = Util.randomString(5);
        } while (curIDs.includes(newID));
        return newID;
    }

}
