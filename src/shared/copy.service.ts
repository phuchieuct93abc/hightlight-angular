import {Injectable} from '@angular/core';
import * as clipboard from "clipboard-polyfill";

@Injectable({
    providedIn: 'root'
})
export class CopyService {

    constructor() {
    }

    copyHtml(innerHTML: string) {
        var dt = new clipboard.DT();
        var html = innerHTML.replace(/----/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
            .replace(/<bra>/g, "")
        dt.setData("text/html", html)
        clipboard.write(dt);
    }
}
