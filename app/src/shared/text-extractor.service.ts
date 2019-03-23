import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TextExtractorService {

    constructor(private httpClient: HttpClient) {
    }

    extracText(file: File | string): Observable<object> {
        return this.httpClient.post("http://localhost:5000/thai-601b6/us-central1/helloWorld", file);
    }
}
