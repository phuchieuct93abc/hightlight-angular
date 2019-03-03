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


    constructor() {
    }

    ngOnInit() {
        hljs.registerLanguage('javascript', javascript);
        hljs.registerLanguage('css', css);
        hljs.registerLanguage('java', java);
        hljs.registerLanguage('html', xml);
        hljs.registerLanguage('xml', xml);

    }

    ngOnChanges(changes: SimpleChanges) {

        if (!this.formattedCode) return;
        this.formattedCode.nativeElement.className = "";

        setTimeout(() => {

            hljs.highlightBlock(this.formattedCode.nativeElement);

            this.code = (this.beauty((this.code), this.formattedCode.nativeElement.classList.item(1)))
            setTimeout(() => {
                hljs.highlightBlock(this.formattedCode.nativeElement)
            })


        })

    }

    private beauty(val, lang): string {
        let beautify = beauty.js;
        if (lang == 'css') {
            beautify = beauty.css
        } else if (lang == 'html' || lang == 'xml') {
            beautify = beauty.html
            console.log('hyml')
        }
        return beautify(val);
    }


}
