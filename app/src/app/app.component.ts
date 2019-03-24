import {History} from './history.model';

import {Component, OnInit, ViewChild} from '@angular/core';


import {CodeInputComponent} from "./code-input/code-input.component";
import {CodeHistoryComponent} from "./code-history/code-history.component";
import {MatSidenav} from "@angular/material";


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    code: string;

    @ViewChild(CodeInputComponent)
    codeInput: CodeInputComponent;
    @ViewChild(CodeHistoryComponent)
    codeHistory: CodeHistoryComponent;
    @ViewChild(MatSidenav)
    sideNav:MatSidenav;

    isOpenHistory = true;

    ngOnInit(): void {
    }


    selectHistory(history: History) {
        this.codeInput.setText(history.code);

    }

    updateHistory(code: string) {
        this.codeHistory.updateHistory(code);

    }


    onCodeChange(code: string) {
        this.code = (code);
        this.updateHistory(code);

    }

    closeHistory() {
       this.isOpenHistory = false;
    }
}
