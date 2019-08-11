import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';


import {MatSnackBar} from "@angular/material";
import {CopyService} from "../../shared/copy.service";
import {CssService} from "../../shared/css.service";
import {CodeFormatterService} from "../../shared/code-formatter.service";
import {NgForm} from "@angular/forms";
import {Subject} from "rxjs";
import {NzMessageService} from "ng-zorro-antd";
import html2canvas from 'html2canvas';
import * as $ from "jquery"

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
    wrap = false;
    isFullScreen = false;
    isScreenShotting = false;
    fontSize = 13;


    constructor(private message: NzMessageService, private snackBar: MatSnackBar, private copyService: CopyService, private cssService: CssService, private codeFormatter: CodeFormatterService) {

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
        this.applyHighlight.next();
    }


    private resetLanguage() {
        this.formattedCode.nativeElement.className = "";
    }

    onCopy() {
        let element = this.formattedCodeCope.nativeElement.parentElement;
        this.cssService.inlineCSS(element)
        this.copyService.copyHtml(element.innerHTML).then(() => {
            this.message.success("Copied code successful! Now you can paste to doc, docx, evernote with the format")
        });
    }

    onChangeLanguage() {
        this.applyHighlightCode();
        this.codeFormatter.onSelectLanguage.next();

    }

    maximize() {

        this.isFullScreen = !this.isFullScreen;
    }

    screenShot() {
        this.isScreenShotting = true;
        let originalFullScreen = this.isFullScreen;
        this.isFullScreen = true;

        setTimeout(() => {
            html2canvas(this.formattedCode.nativeElement).then(canvas => {
                canvas.toBlob((data) => {
                    var a = $("<a style='display: none;'/>");
                    var url = window.URL.createObjectURL(new Blob([data], {type: "image/png"}));
                    a.attr("href", url);
                    a.attr("download", "screenshot");
                    $("body").append(a);
                    a[0].click();
                    window.URL.revokeObjectURL(url);
                    a.remove();
                    this.isFullScreen = originalFullScreen;
                    this.isScreenShotting = false;
                });
            })
        })
    }
}
