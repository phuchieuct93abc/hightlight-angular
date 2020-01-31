import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class TextExtractorService {

    constructor(private httpClient: HttpClient) {
    }

    extracTextByGoogleVision(imageBase64: string): Promise<string> {
        return this.httpClient.post("https://us-central1-thai-601b6.cloudfunctions.net/extractText", imageBase64.split(',')[1])
            .pipe(map(data => data["text"])).toPromise();
    }

    extractTextByTesseract(file: string): Promise<string> {
        return new Promise(resolve => {
            // @ts-ignore
            Tesseract.recognize(file, {lang: 'eng'})
                .then(result => resolve(result.text))
        })


    }

    collectIgnoredCharacter(result2, result1) {
        // @ts-ignore
        let dmp = new diff_match_patch();
        let diffs: [] = dmp.diff_main(result2, result1);
        dmp.diff_cleanupEfficiency(diffs)
        let result = "";
        diffs.forEach(diff => {
            if (diff[0] == 0 || diff[0] == 1) {
                result += diff[1]
            } else {
                let value = <string>diff[1];
                if (value.indexOf("\n") >= 0 && value.trim().length > 0) {
                    result += value;
                }
            }
        })
        return result;
    }


}
