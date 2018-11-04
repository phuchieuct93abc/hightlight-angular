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
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  quill: Quill;
  code: string;
  @ViewChild('formattedCode') formattedCode:ElementRef;


  ngOnInit(): void {

    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('java', java);


    hljs.highlightBlock(this.formattedCode.nativeElement);

    this.enableQuill().pipe(debounceTime(500))
      .pipe(map(val => beauty(val)))
      .subscribe(value => {
        this.code = value;
        this.formattedCode.nativeElement.className="";
        setTimeout(()=>{

          hljs.highlightBlock(this.formattedCode.nativeElement);

        })
      });
  }

  enableQuill() {
    let quill = new Quill('#editor-container', {
      modules: {
        "toolbar": false
      },
      placeholder: 'Paste code here',
      theme: 'snow' 
    });
    return new Observable(observer => {
      quill.on('text-change', (delta, oldDelta, source) => {
        observer.next(quill.getText())

      });

    })





  }

}
