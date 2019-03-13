import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import hljs from 'highlight.js/lib/highlight';
import * as beauty from "js-beautify"
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import {MatSnackBar} from "@angular/material";
import * as clipboard from "clipboard-polyfill"
import * as $ from "jquery"

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
    beautyCode = '';
    beautyCodeCopy = '';
    selectedLanguage = 'auto';
    defaultOption: any;
    languages: string[];
    detectedLanguage: string;


    @ViewChild('formattedCodeCope')
    formattedCodeCope: ElementRef<HTMLDivElement>;


    constructor(private snackBar: MatSnackBar) {
        this.defaultOption = {
            "indent_size": 10,
            "indent_char": "-",
            "indent_with_tabs": false,
        }
    }

    ngOnInit() {


        hljs.registerLanguage('javascript', javascript);
        hljs.registerLanguage('css', css);
        hljs.registerLanguage('java', java);
        hljs.registerLanguage('html', xml);
        hljs.registerLanguage('xml', xml);


        this.inline();

        this.languages = ['auto', 'java', 'javascript', 'html', 'css']
    }

    applyHighlightCode() {
        if (!this.code) return;
        this.resetLanguage();

        this.detectedLanguage = this.detectLanguage();
        this.beautyCode = this.beauty(this.code, this.detectedLanguage);
        this.beautyCodeCopy = this.beauty(this.code, this.detectedLanguage,true);
        this.highlight();
    }

    ngOnChanges(changes: SimpleChanges) {

        this.applyHighlightCode();
    }


    private resetLanguage() {
        this.formattedCode.nativeElement.className = "";
    }

    private beauty(val, lang,isChangeIndent=false): string {
        let beautify = beauty.js;

        if (lang == 'css') {
            beautify = beauty.css
        } else if (lang == 'html' || lang == 'xml') {
            beautify = beauty.html;

        }

        if(isChangeIndent){
            return beautify(val, {
                "indent_size": 4,
                "indent_char": "-",
                "indent_with_tabs": false,
            });
        }

        return beautify(val, {});
    }

    private detectLanguage() {
        if (this.selectedLanguage == 'auto') {

            return hljs.highlightAuto(this.code).language;
        }
        return this.selectedLanguage;
    }

    private highlight() {
        setTimeout(() => {

            hljs.highlightBlock(this.formattedCode.nativeElement);
            hljs.highlightBlock(this.formattedCodeCope.nativeElement);


        })
    }


    onCopy() {
        $(this.formattedCodeCope.nativeElement.parentElement).inlineStyler();


        var dt = new clipboard.DT();
        var html = this.formattedCodeCope.nativeElement.parentElement.innerHTML.replace(/----/g,"&nbsp;&nbsp;&nbsp;&nbsp;")
            .replace(/<bra>/g,"aaa")
      console.log(html);
        dt.setData("text/html", html)
        clipboard.write(dt);






        this.snackBar.open("Copied code successful", null, {duration: 2000})
    }

    inline() {


        $.fn.inlineStyler = function (options) {
            var settings = $.extend({
                // These are the defaults.
                // taken from http://templates.mailchimp.com/resources/email-client-css-support
                'propertyGroups': {
                    '*': ['color',"font-weight"],
                    'block': ['margin', 'padding']
                },
                // taken from http://www.w3schools.com/tags/default.asp
                'elementGroups': {
                    '*': ['A', 'ABBR', 'ACRONYM', 'ADDRESS', 'APPLET', 'AREA', 'ARTICLE', 'ASIDE', 'AUDIO', 'B', 'BASE', 'BASEFONT', 'BDI', 'BDO', 'BIG', 'BLOCKQUOTE', 'BODY', 'BUTTON', 'CANVAS', 'CAPTION', 'CENTER', 'CITE', 'CODE', 'COL', 'COLGROUP', 'COMMAND', 'DATALIST', 'DD', 'DEL', 'DETAILS', 'DFN', 'DIALOG', 'DIR', 'DIV', 'DL', 'DT', 'EM', 'EMBED', 'FIELDSET', 'FIGCAPTION', 'FIGURE', 'FONT', 'FOOTER', 'FORM', 'FRAME', 'FRAMESET', 'H1', 'HEAD', 'HEADER', 'HR', 'HTML', 'I', 'IFRAME', 'IMG', 'INPUT', 'INS', 'KBD', 'KEYGEN', 'LABEL', 'LEGEND', 'LI', 'LINK', 'MAP', 'MARK', 'MENU', 'META', 'METER', 'NAV', 'NOFRAMES', 'NOSCRIPT', 'OBJECT', 'OL', 'OPTGROUP', 'OPTION', 'OUTPUT', 'P', 'PARAM', 'PRE', 'PROGRESS', 'Q', 'RP', 'RT', 'RUBY', 'S', 'SAMP', 'SCRIPT', 'SECTION', 'SELECT', 'SMALL', 'SOURCE', 'SPAN', 'STRIKE', 'STRONG', 'STYLE', 'SUB', 'SUMMARY', 'SUP', 'TABLE', 'TBODY', 'TD', 'TEXTAREA', 'TFOOT', 'TH', 'THEAD', 'TIME', 'TITLE', 'TR', 'TRACK', 'TT', 'U', 'UL', 'VAR', 'VIDEO', 'WBR']
                }
            }, options);


            this.each(function (index, value) {
                for (var group in settings.elementGroups) {
                    for (var i = 0, len = settings.elementGroups[group].length; i < len; i++) {
                        // search for all these tags
                        var elements = $(this).find(settings.elementGroups[group][i]);
                        elements.each(function () {
                            // get the current style rules
                            if ($(this).attr('style')) {
                                var styles = $(this).attr('style');
                                var properties = styles.split(';');
                            } else {
                                var properties = [];
                            }
                            // find all the properties in this rule group
                            for (var i = 0, len = settings.propertyGroups[group].length; i < len; i++) {
                                var thisProp = settings.propertyGroups[group][i];
                                if ($(this).css(thisProp)) {
                                    properties.push(thisProp + ':' + $(this).css(thisProp));
                                }
                            }
                            // add them onto the element as an inline style rule
                            $(this).attr('style', properties.join(';'));
                        });
                    }
                }
            });
        };

    }

    textAreaWithClonedContent() {
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.value = this.formattedCode.nativeElement.innerHTML;

        return textarea;
    }

}
