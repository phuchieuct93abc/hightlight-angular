import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { NzCodeEditorService, NzCodeEditorComponent, } from 'ng-zorro-antd/code-editor';
import { CopyService } from '../shared/copy.service';
import { NzMessageService } from 'ng-zorro-antd';
import { CssService } from 'src/app/shared/css.service';
import { editor } from 'monaco-editor';
import { ImageExtractorService } from '../services/image-extractor.service';
import * as themes from '../themes'
import { LanguageDetectorService } from '../shared/language-detector.service';
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
  themes: string[] = ['vs', 'vs-dark']
  selectedTheme: string = "vs"
  selectedLanguage: string = 'javascript';
  languages: string[];
  autoDetecLanguage: string;

  @ViewChild('codeEditor', { static: false, read: ElementRef })
  codeEditor: ElementRef
  constructor(private zone: NgZone,
    private nzCodeEditorService: NzCodeEditorService,
    private copyService: CopyService,
    private message: NzMessageService,
    private cssService: CssService,
    private imageExtractor: ImageExtractorService,
    private languageDetector: LanguageDetectorService) { }

  ngOnInit() {
    console.time('start')
    this.code = `class Car {
      readonly carName:string;

      private present() {
        var message = "I have a " + this.carName
        return message;
      }
    } 
    `
    this.nzCodeEditorService.updateDefaultOption({
      formatOnType: true,
      formatOnPaste: true,
      copyWithSyntaxHighlighting: true,
      contextmenu: false,
      cursorBlinking: 'smooth',
      wordWrap: "on",
      minimap: { enabled: false },

    })
  }

  onSelectedImage(code: string) {
    this.setModel(code, this.selectedLanguage)
  }
  onEditorInit(e: editor.ICodeEditor): void {
    this.zone.run(() => {
      console.timeEnd('start')

      this.editor = e;
      this.setModel(this.code, this.selectedLanguage);
      this.loadTheme();
      this.loadLanguage();
    })

  }
  format() {
    this.editor.getAction('editor.action.formatDocument').run();
  }



  setModel(code: string, language: string) {
    let applyLanguage = language;
    if (applyLanguage === 'auto') {
      applyLanguage = this.autoDetecLanguage;
    }
    this.editor.setModel(monaco.editor.createModel(code, applyLanguage));
    setTimeout(() => this.format());
  }
  async onCopy() {

    await this.reset()

    await this.sleep(1000);


    let editorElement = this.getCodeEditorElement();
    this.cssService.inlineCSS(editorElement);
    await this.copyService.copyHtml(editorElement.innerHTML);
    this.message.success("Copied code successful! Now you can paste to doc, docx, evernote with the format")

  }

  async reset(): Promise<any> {
    this.code = this.editor.getModel().getValue()
    return new Promise(resolve => {
      this.editor.setModel(monaco.editor.createModel(this.code, this.selectedLanguage));
      this.sleep().then(() => this.format()).then(resolve)

    })
  }



  maximize() {

    this.isFullScreen = !this.isFullScreen;
  }

  async screenShot() {

    this.isScreenShotting = true;
    let originalFullScreen = this.isFullScreen;
    this.isFullScreen = true;
    this.code = this.editor.getModel().getValue();

    this.option.automaticLayout = true

    await this.sleep();//Apply css


    const contentHeight: number = this.editor.getModel().getLineCount() * 19;
    const contentWidth: number = this.getCodeEditorParent().clientWidth;

    console.log(contentHeight, contentWidth, this.editor.getLayoutInfo().contentWidth)
    this.editor.layout();
    await this.reset()

    await this.sleep(1000)

    // 19 is the line height of default theme.
    await this.imageExtractor.extract(this.getCodeEditorParent(), { height: contentHeight, width: contentWidth });

    this.isFullScreen = originalFullScreen;
    this.isScreenShotting = false;
    await this.reset()








  };




  private getCodeEditorElement(): HTMLElement {
    return (<HTMLElement>this.codeEditor.nativeElement).querySelector(".view-lines");

  }

  private getCodeEditorParent(): HTMLElement {
    return (<HTMLElement>this.codeEditor.nativeElement);

  }
  private async  sleep(time = 0): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, time);
    })
  }

  onSelectTheme(selectedTheme) {
    monaco.editor.setTheme(selectedTheme)
    this.selectedTheme = selectedTheme


  }
  onSelectLanguage(language) {
    this.selectedLanguage = language;
    this.reset()
  }
  loadTheme() {
    Object.keys(themes).forEach(k => {
      monaco.editor.defineTheme(k, themes[k]);
      this.themes.push(k);
    })

  }

  loadLanguage() {
    this.languages = monaco.languages.getLanguages().map(language => language.id);
  }


}
