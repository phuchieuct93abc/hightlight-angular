import {Component, EventEmitter, OnInit, Output} from '@angular/core';

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


    constructor() {
    }

    ngOnInit() {
    }

    setImage(imageBase64: string) {
        this.thumbnail = imageBase64;
        this.extractImage(imageBase64);
    }


    onFileSelected(file: File[]) {
        this.convertFileToThumbnail(file[0]);
        this.extractImage(file[0]);
    }

    private extractImage(image: File | string) {
        this.uploading = true;

        // @ts-ignore
        Tesseract.recognize(image, {lang: 'eng'})
            .progress(function (p) {
            })
            .then(result => {
                this.uploading = false;
                this.onSelectedImage.emit(result.text.replace(/\u2013|\u2014/g, "-"))


            })
    }

    private convertFileToThumbnail(file: File) {
        const reader = new FileReader();
        reader.onload = e => this.thumbnail = reader.result;

        reader.readAsDataURL(file);
    }
}
