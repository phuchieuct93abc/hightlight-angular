import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import hljs from 'highlight.js/lib/highlight';
import * as beauty from "js-beautify"
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';

@Component({
    selector: 'app-code-format',
    templateUrl: './code-format.component.html',
    styleUrls: ['./code-format.component.css']
})
export class CodeFormatComponent implements OnInit, OnChanges {

    @Input()
    code: String;
    @ViewChild('formattedCode')
    formattedCode: ElementRef<HTMLDivElement>;
    beautyCode: string;
    language: string;
    defaultOption: any;

    constructor() {
        this.defaultOption = {
            'end_with_newline': true
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
        this.resetLanguage();
        this.language = this.detectLanguage();
        this.beautyCode = this.beauty(this.code, this.language);
        this.highlight();


    }


    private resetLanguage() {
        this.formattedCode.nativeElement.className = "";
    }

    private beauty(val, lang): string {
        let beautify = beauty.js;

        if (lang == 'css') {
            beautify = beauty.css
        } else if (lang == 'html' || lang == 'xml') {
            beautify = beauty.html;

        }

        return beautify(val, this.defaultOption);
    }

    private detectLanguage() {
        return hljs.highlightAuto(this.code).language;
    }

    private highlight() {
        setTimeout(() => {
            hljs.highlightBlock(this.formattedCode.nativeElement);


        })
    }


}
