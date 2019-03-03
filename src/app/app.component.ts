import { History } from './history.model';
import Quill from 'quill';

import { Component, OnInit, NgZone, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import beauty from "js-beautify"

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import getUuid from '../shared/uuid';



@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  quill: Quill;
  code: string;
  history: History[] = [];
  selectedHistoryId:string;
  @ViewChild('formattedCode') formattedCode: ElementRef;


  ngOnInit(): void {

    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('java', java);
    hljs.registerLanguage('html', xml);
    hljs.registerLanguage('xml', xml);


    hljs.highlightBlock(this.formattedCode.nativeElement);

    this.enableQuill().pipe(debounceTime(500))
      .pipe(map(val => beauty(val)))
      .subscribe(code => {

        this.code = code;
        this.updateHistory(code); this.formattedCode.nativeElement.className = "";
       
        setTimeout(() => {

          hljs.highlightBlock(this.formattedCode.nativeElement);

        })
      });
  }

  enableQuill() {
    this.quill = new Quill('#editor-container', {
      modules: {
        "toolbar": false
      },
      placeholder: 'Paste code here',
      theme: 'snow'
    });
    return new Observable(observer => {
      this.quill.on('text-change', (delta, oldDelta, source) => {
        observer.next(this.quill.getText())

      });

    })
  }
  selectHistory(history: History) {

    this.quill.setText(history.code)

  }
  updateHistory(code: string) {
    let existedHistory = this.history.find(history=>history.code === code);
    if(existedHistory==null){
      let newHistory = new History(getUuid(), code)
      this.selectedHistoryId = newHistory.id
      this.history.unshift(newHistory);
    }else{
      this.selectedHistoryId = existedHistory.id;
    }

  }
 

}
