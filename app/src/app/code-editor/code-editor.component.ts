import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NzCodeEditorService, NzCodeEditorComponent, } from 'ng-zorro-antd/code-editor';
import { CopyService } from '../../shared/copy.service';
import { NzMessageService } from 'ng-zorro-antd';
import { CssService } from 'src/shared/css.service';
import { CodeFormatterService } from 'src/shared/code-formatter.service';
import html2canvas from 'html2canvas';
import * as $ from "jquery"
import { editor } from 'monaco-editor';

declare const monaco: any;
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {

  code: string;
  isFullScreen = false;
  isScreenShotting = false;
  editor: editor.ICodeEditor;
  isShowEditor = true;
  option: editor.IEditorConstructionOptions = {}


  @ViewChild('codeEditor', { static: false })
  codeEditor: NzCodeEditorComponent
  constructor(private zone: NgZone, private nzCodeEditorService: NzCodeEditorService, private copyService: CopyService, private message: NzMessageService, private cssService: CssService, private codeFormatter: CodeFormatterService) { }

  ngOnInit() {
    this.code = `var x = {
      a: 1,
        b: 2,
        c:3
  }    `
    this.nzCodeEditorService.updateDefaultOption({
      formatOnType: true,
      formatOnPaste: true,
      copyWithSyntaxHighlighting: true,
      contextmenu: false,
      cursorBlinking: 'smooth',
      wordWrap: "on",
      automaticLayout: false,
      minimap:{enabled:false}

    })
  }
  onSelectedImage(code: string) {
    this.setModel(code, 'javascript')
  }
  onEditorInit(e: editor.ICodeEditor): void {
    this.editor = e;
    this.setModel(this.code, 'javascript');
  }
  format() {
    this.editor.getAction('editor.action.formatDocument').run();

  }



  setModel(code: string, language: string) {
    this.editor.setModel(monaco.editor.createModel(code, language));
    setTimeout(() => this.format());
  }
  onCopy() {

    this.reset()
    setTimeout(() => {

      let editorElement = this.getCodeEditorElement();
      this.cssService.inlineCSS(editorElement);
      this.copyService.copyHtml(editorElement.innerHTML).then(() => {
        this.message.success("Copied code successful! Now you can paste to doc, docx, evernote with the format")
      });
    }, 100);
  }

  reset(): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.setModel(this.editor.getModel().getValue(), 'javascript');
        setTimeout(() => {
          resolve();
        }, 2000);
      }, 2000);

    })
  }


  maximize() {

    this.isFullScreen = !this.isFullScreen;
  }

  async screenShot() {

    console.log('start')
    this.isScreenShotting = true;
    let originalFullScreen = this.isFullScreen;
    this.isFullScreen = true;
    // this.isShowEditor = false;
    this.code = this.editor.getModel().getValue();

    this.option.automaticLayout = true

    setTimeout(() => {
      this.isShowEditor = true
      this.editor.layout()
      this.reset()
      setTimeout(() => {

        setTimeout(() => {
          html2canvas(this.getCodeEditorParent()).then(canvas => {
            canvas.toBlob((data) => {
              var a = $("<a style='display: none;'/>");
              var url = window.URL.createObjectURL(new Blob([data], { type: "image/png" }));
              a.attr("href", url);
              a.attr("download", "screenshot"); 
              $("body").append(a);
              a[0].click();
              window.URL.revokeObjectURL(url);
              a.remove();
              this.zone.run(() => {

                this.isFullScreen = originalFullScreen;
                this.isScreenShotting = false;
                this.nzCodeEditorService.updateDefaultOption({

                  automaticLayout: true

                })
              })
            });
          })
        }, 500);

      }, 2000);







    })
  };



  private getCodeEditorElement(): HTMLElement {
    return (<HTMLElement>this.codeEditor.el).querySelector(".view-lines");

  }

  private getCodeEditorParent(): HTMLElement {
    return (<HTMLElement>this.codeEditor.el);

  }



}
