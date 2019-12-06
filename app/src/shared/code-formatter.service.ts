import {Injectable} from '@angular/core';
import hljs from 'highlight.js';
import * as beauty from "js-beautify"
import {Subject} from "rxjs";
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';

@Injectable({
    providedIn: 'root'
})
export class CodeFormatterService {

    currentLanguage = 'auto';
    onSelectLanguage = new Subject<string>();
    defaultBeautifyOption = {
        "e4x": true,
        "jslint_happy": true,
        "selector_separator_newline": false,
        "max_preserve_newlines": "-1",
        "preserve_newlines": false,
    };

    constructor() {
        hljs.configure({useBR: true});


    }

    detectLanguage(code: string) {

        return this.currentLanguage == 'auto' ? hljs.highlightAuto(code).language : this.currentLanguage;

    }

    beautify(code: string, isChangeIndent = false) {
        let language = this.detectLanguage(code);
        let option = {}
        let beautify;

        switch (language) {
            case 'css':
            case "scss":
                beautify = beauty.css;
                break;
            case 'js':
            case 'javascript':
            case 'json':
            case 'java':
                beautify = beauty.js;
                break;
            case 'xml':
            case 'html':
                beautify = beauty.html;
                break;
        }
        if (!beautify) {
            return code.replace(/\t/g, '    ');
            ;
        }

        if (isChangeIndent) {
            option = {
                "indent_size": 4,
                "indent_char": " ",
                "indent_with_tabs": false,
            };
        }
        console.log(beautify);
        let result = beautify(code, {...option, ...this.defaultBeautifyOption});
        return result;

    }

    changeLanguage(selectedLanguage: string) {
        this.currentLanguage = selectedLanguage;

    }

    highlight(element: HTMLElement) {
        setTimeout(() => {
            hljs.highlightBlock(element);
        })
    }


}
