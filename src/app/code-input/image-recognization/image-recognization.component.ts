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


    onFileSelected(file: File[]) {
        this.uploading = true;
        const reader = new FileReader();
        reader.onload = e => this.thumbnail = reader.result;

        reader.readAsDataURL(file[0]);
        // @ts-ignore
        Tesseract.recognize(file[0])
            .progress(function (p) {
                console.log('progress', p)
            })
            .then(result => {
                this.uploading = false;
                this.onSelectedImage.emit(result.text.replace(/\u2013|\u2014/g, "-"))


            })
    }
}
