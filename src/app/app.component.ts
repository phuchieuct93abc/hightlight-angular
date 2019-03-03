import {History} from './history.model';

import {Component, OnInit, ViewChild} from '@angular/core';


import {CodeInputComponent} from "./code-input/code-input.component";
import {CodeHistoryComponent} from "./code-history/code-history.component";


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    code: string;

    @ViewChild(CodeInputComponent)
    codeInput: CodeInputComponent;
    @ViewChild(CodeHistoryComponent)
    codeHistory: CodeHistoryComponent;


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
}
