import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {History} from "../history.model";
import getUuid from "../../shared/uuid";

@Component({
    selector: 'app-code-history',
    templateUrl: './code-history.component.html',
    styleUrls: ['./code-history.component.css']
})
export class CodeHistoryComponent implements OnInit {
    history: History[] = [];
    selectedHistoryId: string;

    @Output()
    historySelected = new EventEmitter<History>()

    constructor() {
    }

    ngOnInit() {
    }

    public updateHistory(code: string) {
        let existedHistory = this.history.find(history => history.code === code);
        if (existedHistory == null) {
            let newHistory = new History(getUuid(), code)
            this.selectedHistoryId = newHistory.id
            this.history.unshift(newHistory);
        } else {
            this.selectedHistoryId = existedHistory.id;
        }

    }

    selectHistory(history: History) {
        this.historySelected.emit(history);

    }
}
