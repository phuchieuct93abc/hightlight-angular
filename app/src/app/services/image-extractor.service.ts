import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import * as $ from "jquery"

@Injectable({
  providedIn: 'root'
})
export class ImageExtractorService {

  constructor() { }
  extract(element: HTMLElement, option): Promise<any> {
    return new Promise(resolve => {

      html2canvas(element, option).then(canvas => {
        canvas.toBlob((data) => {
          var a = $("<a style='display: none;'/>");
          var url = window.URL.createObjectURL(new Blob([data], { type: "image/png" }));
          a.attr("href", url);
          a.attr("download", "screenshot");
          $("body").append(a);
          a[0].click();
          window.URL.revokeObjectURL(url);
          a.remove();
          resolve()

        });
      })
    })
  }
}
