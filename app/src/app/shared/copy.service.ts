import {Injectable} from '@angular/core';
import * as clipboard from "clipboard-polyfill";

@Injectable({
    providedIn: 'root'
})
export class CopyService {

    constructor() {
    }

    copyHtml(innerHTML: string):Promise<void> {
        let dt = new clipboard.DT();
        let html = innerHTML.trim().replace(/    /g, "&nbsp;&nbsp;&nbsp;&nbsp;")
        dt.setData("text/html", html)
        return clipboard.write(dt);
    }


    copyText(innerHTML: string):Promise<void> {
        let dt = new clipboard.DT();
        let html = innerHTML.trim().replace(/    /g, "&nbsp;&nbsp;&nbsp;&nbsp;")
        dt.setData("text", html)
        return clipboard.write(dt);
    }
}
