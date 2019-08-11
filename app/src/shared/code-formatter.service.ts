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

    constructor() {
        hljs.configure({useBR: true});
        // hljs.registerLanguage('javascript', javascript);
        // hljs.registerLanguage('css', css);
        // hljs.registerLanguage('java', java);
        // hljs.registerLanguage('html', xml);
        // hljs.registerLanguage('xml', xml);
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
                beautify = beauty.js;
                break;
            case 'xml':
            case 'html':
                beautify = beauty.html;
                break;
        }
        if (!beautify) {
            return code.replace(/\t/g, '    ');;
        }

        if (isChangeIndent) {
            option = {
                "indent_size": 4,
                "indent_char": " ",
                "indent_with_tabs": false,
            };
        }
        let result = beautify(code, option);
        return result;

    }

    changeLanguage(selectedLanguage: string) {
        this.currentLanguage = selectedLanguage;

    }

    formatBlock(element: HTMLElement) {
        setTimeout(() => {
            hljs.highlightBlock(element);
        })
    }


}
