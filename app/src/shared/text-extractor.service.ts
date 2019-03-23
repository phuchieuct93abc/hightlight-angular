import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class TextExtractorService {

    constructor(private httpClient: HttpClient) {
    }

    extracText(file: string): Observable<string> {
        return this.httpClient.post("https://us-central1-thai-601b6.cloudfunctions.net/extractText", file)
            .pipe(map(data => data["text"]));
    }
}
