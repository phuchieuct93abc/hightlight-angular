import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NzCodeEditorService, NzCodeEditorComponent } from 'ng-zorro-antd/code-editor';
import { CopyService } from '../../shared/copy.service';
import { NzMessageService } from 'ng-zorro-antd';
import { CssService } from 'src/shared/css.service';
import { CodeFormatterService } from 'src/shared/code-formatter.service';
import html2canvas from 'html2canvas';
import * as $ from "jquery"

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {

  code: string;
  isFullScreen = false;
  isScreenShotting;
  @ViewChild('codeEditor', { static: false })
  codeEditor: NzCodeEditorComponent
  constructor(private zone: NgZone, private nzCodeEditorService: NzCodeEditorService, private copyService: CopyService, private message: NzMessageService, private cssService: CssService, private codeFormatter: CodeFormatterService) { }

  ngOnInit() {
    this.code = `var x = {    }  `
    this.nzCodeEditorService.updateDefaultOption({
      formatOnType: true,
      formatOnPaste: true
    })
  }
  onCopy() {
    let editorElement = this.getCodeEditorElement();
    this.cssService.inlineCSS(editorElement);
    this.copyService.copyHtml(editorElement.innerHTML).then(() => {
      this.message.success("Copied code successful! Now you can paste to doc, docx, evernote with the format")
    });
  }



  maximize() {

    this.isFullScreen = !this.isFullScreen;
  }

  screenShot() {
    this.isScreenShotting = true;
    let originalFullScreen = this.isFullScreen;
    this.isFullScreen = true;

    setTimeout(() => {
      let editorElement = this.getCodeEditorElement(); 

      html2canvas(editorElement).then(canvas => {
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
          })
        });
      })
    })
  }

  private getCodeEditorElement(): HTMLElement {
    return (<HTMLElement>this.codeEditor.el).querySelector(".view-lines");

  }

}
