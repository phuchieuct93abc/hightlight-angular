import { Component, OnInit } from '@angular/core';
import { NzCodeEditorService } from 'ng-zorro-antd/code-editor';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {

  code: string
  constructor(private nzCodeEditorService: NzCodeEditorService) { }

  ngOnInit() {
    this.code = "console.log('12')"
    this.nzCodeEditorService.updateDefaultOption({
      formatOnType:true,
      formatOnPaste:true
    })
  }

}
