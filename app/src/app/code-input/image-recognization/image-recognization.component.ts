import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TextExtractorService} from "../../../shared/text-extractor.service";
import {Observable} from "rxjs";
import {FileSystemFileEntry, UploadEvent, UploadFile} from "ngx-file-drop";
import {bounce} from "ng-animate";
import {transition, trigger, useAnimation} from "@angular/animations";

@Component({
    selector: 'app-image-recognization',
    templateUrl: './image-recognization.component.html',
    styleUrls: ['./image-recognization.component.scss'],
    animations: [
        trigger('bounce', [
            transition('* => *', useAnimation(bounce, {}))])
    ],
})
export class ImageRecognizationComponent implements OnInit {

    @Output()
    onSelectedImage = new EventEmitter<string>();
    uploading = false;
    thumbnail: string | ArrayBuffer;
    public files: UploadFile[] = [];
    isDragging = false;
    base64regex = /^data*/;


    constructor(private textExtractor: TextExtractorService) {
    }

    ngOnInit() {

    }

    setImage(imageBase64: string) {
        console.log(imageBase64)
        if (this.base64regex.test(imageBase64) ) {
            this.thumbnail = imageBase64;
            this.extractImage(imageBase64);
        }else{
            this.close()
        }

    }
    private isURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'); // fragment locator
        return pattern.test(str);
    }

    onFileSelected(file: File[]) {
        this.convertFileToThumbnail(file[0]).subscribe(data => {
            this.thumbnail = data;
            this.extractImage(data);

        });
    }

    private extractImage(image: string) {
        this.uploading = true;


        Promise.all([
            this.textExtractor.extracTextByGoogleVision(image),
            this.textExtractor.extractTextByTesseract(image)]
        ).then(result => {
            console.log(result)
            let result1 = result[0];
            let result2 = result[1];
            let extractedText = this.textExtractor.collectIgnoredCharacter(result2, result1);

            this.uploading = false;
            this.onSelectedImage.emit(extractedText.replace(/\u2013|\u2014/g, "-").replace(/“/g, "\""))

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

    public dropped(event: UploadEvent) {
        this.isDragging = false;
        this.files = event.files;
        for (const droppedFile of event.files) {

            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {
                    this.onFileSelected([file]);

                });
            } else {
                console.log("folder");
            }
        }
    }

    public fileOver(event) {
        this.isDragging = true
    }

    public fileLeave(event) {
        this.isDragging = false;
    }


    close() {
        this.thumbnail = null;
        this.isDragging = false;
        this.onSelectedImage.emit("");
    }
};

