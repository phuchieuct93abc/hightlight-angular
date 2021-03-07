import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { languages } from 'monaco-editor';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {

  @Output()
  onSelect = new EventEmitter<string>()
  
  private _languages: string[];
  @Input()
  set languages(value: string[]) {
    
    this._languages = value;
    this.filteredLanguage = value
  }
  get languages() {
    return this._languages
  }
  private _defaultLanguage: string;

  @Input()
  public set defaultLanguage(value: string) {
    this._defaultLanguage = value;
    this.selectedLanguage = this._defaultLanguage;

  }
  public get defaultLanguage(): string {
    return this._defaultLanguage;
  }




  filteredLanguage: string[]
  selectedLanguage: string
  constructor() { }

  ngOnInit() {
    this.selectedLanguage = this.defaultLanguage;
  }
  onSearch(selectedLanguage) {
    if (!this.languages) return;
    this.filteredLanguage = this.languages.filter(l => !selectedLanguage || 0 === selectedLanguage.length || l.indexOf(selectedLanguage) > -1);
  }
  select(selectedLanguage) {
    console.log(12);
    this.selectedLanguage = selectedLanguage; 
    this.onSelect.emit(selectedLanguage);
  }

}