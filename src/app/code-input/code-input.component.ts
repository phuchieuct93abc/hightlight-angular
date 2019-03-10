import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import Quill from 'quill';
import {Observable} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
    selector: 'app-code-input',
    templateUrl: './code-input.component.html',
    styleUrls: ['./code-input.component.scss']
})
export class CodeInputComponent implements AfterViewInit {

    @Output()
    onChange = new EventEmitter<string>();


    quill: Quill;

    constructor() {
    }

    setText(code: string) {
        this.quill.setText(code)

    }


    enableQuill() {
        this.quill = new Quill('#editor-container', {
            modules: {
                "toolbar": false
            },
            placeholder: 'Paste code here',
            theme: 'snow'
        });

        return new Observable(observer => {
            this.quill.on('text-change', () => {
                observer.next((this.quill.getText()))
            });
        })


    }

    ngAfterViewInit(): void {
        this.enableQuill().pipe(debounceTime(500))
            .subscribe((code: string) => {
                this.onChange.emit(code);
            })
    }


}
