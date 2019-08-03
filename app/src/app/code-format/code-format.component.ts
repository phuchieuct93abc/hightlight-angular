import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';


import {MatSnackBar} from "@angular/material";
import {CopyService} from "../../shared/copy.service";
import {CssService} from "../../shared/css.service";
import {CodeFormatterService} from "../../shared/code-formatter.service";
import {NgForm} from "@angular/forms";
import {Subject, timer} from "rxjs";
import {debounce} from "rxjs/operators";

@Component({
    selector: 'app-code-format',
    templateUrl: './code-format.component.html',
    styleUrls: ['./code-format.component.scss']
})
export class CodeFormatComponent implements OnInit, OnChanges {

    @Input()
    code: string;
    @ViewChild('formattedCode')
    formattedCode: ElementRef<HTMLDivElement>;
    beautyCode = '';
    beautyCodeCopy = '';
    languages: string[];
    detectedLanguage: string;
    themes: string[];
    selectedLanguage = 'auto';

    selectedTheme = 'default';


    @ViewChild('formattedCodeCope')
    formattedCodeCope: ElementRef<HTMLDivElement>;

    @ViewChild('form')
    form: NgForm;

    applyHighlight = new Subject();


    constructor(private snackBar: MatSnackBar, private copyService: CopyService, private cssService: CssService, private codeFormatter: CodeFormatterService) {

    }

    ngOnInit() {

        this.languages = ['auto', 'java', 'javascript', 'html', 'css'];
        this.form.valueChanges.subscribe((value) => {
            setTimeout(this.applyHighlightCode.bind(this));
        })


        this.applyHighlight.subscribe(() => {
            this.applyHighlightCode();
        })

    }

    applyHighlightCode() {
        if (!this.code) return;
        this.resetLanguage();
        this.codeFormatter.changeLanguage(this.selectedLanguage);

        this.detectedLanguage = this.codeFormatter.detectLanguage(this.code);
        this.codeFormatter.changeLanguage(this.detectedLanguage);

        this.beautyCode = this.codeFormatter.beautify(this.code);
        this.beautyCodeCopy = this.codeFormatter.beautify(this.code, true);
        setTimeout(() => {
            this.codeFormatter.formatBlock(this.formattedCode.nativeElement);
            this.codeFormatter.formatBlock(this.formattedCodeCope.nativeElement);
        })
    }

    ngOnChanges(changes: SimpleChanges) {

        console.log("a")
        this.applyHighlight.next();
    }


    private resetLanguage() {
        this.formattedCode.nativeElement.className = "";
    }

    onCopy() {
        let element = this.formattedCodeCope.nativeElement.parentElement;
        this.cssService.inlineCSS(element)
        this.copyService.copyHtml(element.innerHTML).then(() => {
            this.snackBar.open("Copied code successful", null, {duration: 2000})
        });
    }

    onChangeLanguage() {
        this.applyHighlightCode();
        this.codeFormatter.onSelectLanguage.next();

    }

    maximize() {

    }
}
