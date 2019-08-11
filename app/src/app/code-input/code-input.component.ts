import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import Quill from 'quill';
import {Observable, timer} from "rxjs";
import {ImageDrop} from 'quill-image-drop-module';
import {ImageRecognizationComponent} from "./image-recognization/image-recognization.component";
import {CodeFormatterService} from "../../shared/code-formatter.service";
import {debounce} from "rxjs/operators";
import {CodeHistoryComponent} from "../code-history/code-history.component";


@Component({
    selector: 'app-code-input',
    templateUrl: './code-input.component.html',
    styleUrls: ['./code-input.component.scss']
})
export class CodeInputComponent implements AfterViewInit, OnInit {

    @Output()
    onChange = new EventEmitter<string>();

    @ViewChild(ImageRecognizationComponent,{static:true})
    imageRecognize: ImageRecognizationComponent;

    quill: Quill;
    @ViewChild(CodeHistoryComponent,{static:true})
    codeHistory: CodeHistoryComponent;

    constructor(private codeFormatter: CodeFormatterService) {
    }

    ngOnInit(): void {
        Quill.register('modules/imageDrop', ImageDrop);
        this.enableCopyFromCLipboard();

    }


    private enableCopyFromCLipboard() {
        var IMAGE_MIME_REGEX = /^image\/(p?jpeg|gif|png)$/i;
        var loadImage = function (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.createElement('img');
                img.src = e.target['result'];
                var range = window.getSelection().getRangeAt(0);
                range.deleteContents();
                range.insertNode(img);
            };
            reader.readAsDataURL(file);
        };

        document.onpaste = function (e) {
            var items = e.clipboardData.items;
            for (var i = 0; i < items.length; i++) {
                if (IMAGE_MIME_REGEX.test(items[i].type)) {
                    loadImage(items[i].getAsFile());
                    return;
                }
            }

        }
    }

    setText(code: string) {
        this.quill.setText(code)
    }


    enableQuill() {
        this.quill = new Quill('#editor-container', {
            modules: {
                "toolbar": false,
                imageDrop: true

            },
            placeholder: 'Paste code or paste image to extract the code here',
            theme: 'snow'
        });


        return new Observable(observer => {
            this.quill.on('text-change', () => {
                if (this.extractImage().length > 0) {
                    this.imageRecognize.setImage(this.extractImage()[0]);
                    this.quill.setText("")
                } else {

                    observer.next(this.quill.getText())

                }
            });
        })


    }

    formatQuill() {
        let originalText = this.quill.getText();
        let beautyCode = this.codeFormatter.beautify(originalText);
        this.quill.setText(beautyCode);
    }

    extractImage(): string[] {
        return this.quill.getContents().filter(op => {
            return typeof op.insert == 'object' && op.insert['image'] != undefined;
        }).map(op => op.insert['image'])

    }

    ngAfterViewInit(): void {
        this.enableQuill().pipe(debounce(() => timer(500))).subscribe((code: string) => {
            this.onChange.emit(code);
            this.codeHistory.updateHistory(code);

        })
    }


}
