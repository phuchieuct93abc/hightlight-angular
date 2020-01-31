import { Injectable } from '@angular/core';
import hljs from 'highlight.js';

@Injectable({
  providedIn: 'root'
})
export class LanguageDetectorService {

  constructor() { }

  detectLanguage(code: string) {
    return hljs.highlightAuto(code).language;
  }
}
