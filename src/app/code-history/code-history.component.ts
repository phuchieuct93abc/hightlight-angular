import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {History} from "../history.model";
import getUuid from "../../shared/uuid";
import {StorageService} from "../../shared/storage.service";
import {Subject, timer} from "rxjs";
import {debounce} from "rxjs/operators";

@Component({
    selector: 'app-code-history',
    templateUrl: './code-history.component.html',
    styleUrls: ['./code-history.component.css']
})
export class CodeHistoryComponent implements OnInit {
    history: History[];
    selectedHistoryId: string;


    @Output()
    historySelected = new EventEmitter<History>();

    updateHistoryDebounce = new Subject<string>();

    constructor(private storage: StorageService) {

    }

    ngOnInit() {
        this.history = this.storage.load("history") || [];
        this.updateHistoryDebounce.pipe(debounce(() => timer(1000))).subscribe((code: string) => {
            if (code.trim() == '') {
                return;
            }
            let existedHistory = this.history.find(history => history.code === code);
            if (existedHistory == null) {
                let sameHistory = this.findSameHistory(code);
                if (sameHistory) {
                    this.selectedHistoryId = sameHistory.id
                } else {
                    this.updateNewHistory(code);
                }


            } else {
                this.selectedHistoryId = existedHistory.id;
            }
            this.storage.save("history", this.history);
        })

    }

    public updateHistory(code: string) {
        this.updateHistoryDebounce.next(code);

    }

    private updateNewHistory(code: string) {
        let newHistory = new History(getUuid(), code);
        this.selectedHistoryId = newHistory.id;
        this.history.unshift(newHistory);
    }

    selectHistory(history: History) {
        this.historySelected.emit(history);

    }

    clearAll() {
        this.history = [];
        this.storage.save("history", this.history);
    }

    findSameHistory(code): History {
        // @ts-ignore
        let dmp = new diff_match_patch();
        return this.history.find(history => {
            let diffs: [] = dmp.diff_main(history.code, code);
            let resultDiff = diffs.filter(diff => diff[0] != 0 && (<string>diff[1]).trim().length > 0);
            return resultDiff.length == 0;
        })


    }
}
