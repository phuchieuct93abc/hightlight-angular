import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TextExtractorService} from "../../../shared/text-extractor.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-image-recognization',
    templateUrl: './image-recognization.component.html',
    styleUrls: ['./image-recognization.component.scss']
})
export class ImageRecognizationComponent implements OnInit {

    @Output()
    onSelectedImage = new EventEmitter<string>();
    uploading = false;
    thumbnail: string | ArrayBuffer;


    constructor(private textExtractor: TextExtractorService) {
    }

    ngOnInit() {
    }

    setImage(imageBase64: string) {
        this.thumbnail = imageBase64;
        this.extractImage(imageBase64);
    }


    onFileSelected(file: File[]) {
        this.convertFileToThumbnail(file[0]).subscribe(data => {
            this.thumbnail = data;
            this.extractImage(data);

        });
    }

    private extractImage(image: string) {

        this.uploading = true;

        this.textExtractor.extracText(image.split(',')[1]).subscribe(result => {
            console.log("run with google clould vision");
            this.uploading = false;
            this.onSelectedImage.emit(result.replace(/\u2013|\u2014/g, "-"))
        })


    }

    private convertFileToThumbnail(file: File): Observable<string> {
        return new Observable(resolver => {
            const reader = new FileReader();
            reader.onload = e => {
                resolver.next(<string>reader.result)
            };

            reader.readAsDataURL(file);
        })

    }


};

