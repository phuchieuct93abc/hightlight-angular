import {History} from './history.model';



import {CodeInputComponent} from "./code-input/code-input.component";
import {CodeHistoryComponent} from "./code-history/code-history.component";
import {MatSidenav} from "@angular/material";
import {Component, OnInit, ViewChild} from "@angular/core";


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    code: string;

    @ViewChild(CodeInputComponent,{static:true})
    codeInput: CodeInputComponent;

    @ViewChild(MatSidenav,{static:true})
    sideNav:MatSidenav;

    isOpenHistory = true;

    ngOnInit(): void {
    }


    selectHistory(history: History) {
        this.codeInput.setText(history.code);

    }

    onCodeChange(code: string) {
        this.code = (code);

    }

    closeHistory() {
       this.isOpenHistory = false;
    }
}
