import {Injectable} from '@angular/core';
import hljs from 'highlight.js/lib/highlight';
import * as beauty from "js-beautify"
import {Subject} from "rxjs";
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';

@Injectable({
    providedIn: 'root'
})
export class CodeFormatterService {

    currentLanguage = 'auto';
    onSelectLanguage = new Subject<string>();

    constructor() {
        hljs.configure({ useBR: true })
        hljs.registerLanguage('javascript', javascript);
        hljs.registerLanguage('css', css);
        hljs.registerLanguage('java', java);
        hljs.registerLanguage('html', xml);
        hljs.registerLanguage('xml', xml);
    }

    detectLanguage(code: string) {

        return this.currentLanguage == 'auto' ? hljs.highlightAuto(code).language : this.currentLanguage;

    }

    beautify(code: string, isChangeIndent = false) {
        let beautify = beauty.js;
        let language = this.detectLanguage(code);
        let option = {}

        if (language == 'css') {
            beautify = beauty.css
        } else if (language == 'html' || language == 'xml') {
            beautify = beauty.html;

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
