import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolkit',
  templateUrl: './toolkit.component.html',
  styleUrls: ['./toolkit.component.scss']
})
export class ToolkitComponent implements OnInit {

  @Input()
  themes: string[]
  @Input()
  selectedTheme: string
  @Output()
  onSelectTheme = new EventEmitter<string>();
  @Input()
  languages: string[]
  @Input()
  selectedLanguage: string
  @Output()
  onSelectLanguage = new EventEmitter<string>();

  @Output()
  onScreenShot = new EventEmitter<any>();
  @Output()
  onMaximize = new EventEmitter<any>();
  @Output()
  onCopy = new EventEmitter<any>();
  @Output()
  onFormat = new EventEmitter<any>();

  isFullScreen = false;
  constructor() { }

  ngOnInit() {
  }
  selectTheme(theme) {
    this.selectedTheme = theme;
    this.onSelectTheme.emit(theme);
  }
  selectLanguage(language) {
    this.selectedLanguage = language;
    this.onSelectLanguage.emit(language);
  }
  screenShot() {
    this.onScreenShot.emit()
  }
  maximize() {
    this.isFullScreen = !this.isFullScreen;
    this.onMaximize.emit()

  }
  copy() {
    this.onCopy.emit()

  }
  format() {
    this.onFormat.emit()

  }

}
