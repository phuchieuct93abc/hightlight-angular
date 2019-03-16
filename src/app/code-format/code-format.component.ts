import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';


import {MatSnackBar} from "@angular/material";
import {CopyService} from "../../shared/copy.service";
import {CssService} from "../../shared/css.service";
import {CodeFormatterService} from "../../shared/code-formatter.service";

@Component({
    selector: 'app-code-format',
    templateUrl: './code-format.component.html',
    styleUrls: ['./code-format.component.css']
})
export class CodeFormatComponent implements OnInit, OnChanges {

    @Input()
    code: string;
    @ViewChild('formattedCode')
    formattedCode: ElementRef<HTMLDivElement>;
    beautyCode = '';
    beautyCodeCopy = '';
    selectedLanguage = 'auto';
    languages: string[];
    detectedLanguage: string;


    @ViewChild('formattedCodeCope')
    formattedCodeCope: ElementRef<HTMLDivElement>;


    constructor(private snackBar: MatSnackBar, private copyService: CopyService, private cssService: CssService, private codeFormatter: CodeFormatterService) {

    }

    ngOnInit() {

        this.languages = ['auto', 'java', 'javascript', 'html', 'css']
    }

    applyHighlightCode() {

        if (!this.code) return;
        this.resetLanguage();
        this.codeFormatter.changeLanguage(this.selectedLanguage);

        this.detectedLanguage = this.codeFormatter.detectLanguage(this.code);
        this.codeFormatter.changeLanguage(this.detectedLanguage);
        this.beautyCode = this.code;
        this.beautyCodeCopy = this.codeFormatter.beautify(this.code, true);
        this.highlight();
    }

    ngOnChanges(changes: SimpleChanges) {

        this.applyHighlightCode();
    }


    private resetLanguage() {
        this.formattedCode.nativeElement.className = "";
    }

    private highlight() {
        this.codeFormatter.formatBlock(this.formattedCode.nativeElement);
        this.codeFormatter.formatBlock(this.formattedCodeCope.nativeElement);

    }


    onCopy() {
        let element = this.formattedCodeCope.nativeElement.parentElement;
        this.cssService.inlineCSS(element)
        this.copyService.copyHtml(element.innerHTML);
        this.snackBar.open("Copied code successful", null, {duration: 2000})
    }

    onChangeLanguage() {
        this.applyHighlightCode();
        this.codeFormatter.onSelectLanguage.next();

    }
}
