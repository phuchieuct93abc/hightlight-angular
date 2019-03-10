import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import hljs from 'highlight.js/lib/highlight';
import * as beauty from "js-beautify"
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import * as _ from 'lodash';

@Component({
    selector: 'app-code-format',
    templateUrl: './code-format.component.html',
    styleUrls: ['./code-format.component.css']
})
export class CodeFormatComponent implements OnInit, OnChanges {

    @Input()
    code: String;
    escapedCode;
    language: string;
    copiedCode: string;
    @ViewChild('formattedCode')
    formattedCode: ElementRef<HTMLDivElement>;
    defaultOption:any;

    constructor() {
        this.defaultOption = {
            'end_with_newline': true,
            'jslint_happy': true
        }
    }

    ngOnInit() {
        hljs.registerLanguage('javascript', javascript);
        hljs.registerLanguage('css', css);
        hljs.registerLanguage('java', java);
        hljs.registerLanguage('html', xml);
        hljs.registerLanguage('xml', xml);

    }

    ngOnChanges(changes: SimpleChanges) {

        if (!this.code) return;
        this.escapedCode = this.code;
        console.log(this.escapedCode)
        this.formattedCode.nativeElement.className = "";

        setTimeout(() => {

            hljs.highlightBlock(this.formattedCode.nativeElement);

            this.escapedCode = this.beauty(this.code)
            setTimeout(() => {
                hljs.highlightBlock(this.formattedCode.nativeElement)
            })
            this.language = this.getLanguage();
            this.copiedCode = this.escapedCode;
            console.log(this.copiedCode);

        })

    }


    private beauty(val): string {
        let beautify = beauty.js;
        let lang = this.getLanguage();

        if (lang == 'css') {
            beautify = beauty.css
        } else if (lang == 'html' || lang == 'xml' || this.isHTML(val)) {
            beautify = beauty.html;
            return (beautify(val,this.defaultOption));

        }

        return beautify(val, this.defaultOption);
    }

    private isHTML(str) {
        let doc = new DOMParser().parseFromString(str, "text/html");
        return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
    }

    private getLanguage() {
        return this.formattedCode.nativeElement.classList.item(1);
    }


}
