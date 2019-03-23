import {MaterialModule} from './material.module';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CodeInputComponent} from "./code-input/code-input.component";
import {CodeHistoryComponent} from "./code-history/code-history.component";
import {CodeFormatComponent} from "./code-format/code-format.component";
import {ClipboardModule} from "ngx-clipboard";
import {MatFileUploadModule} from "angular-material-fileupload";
import {ImageRecognizationComponent} from "./code-input/image-recognization/image-recognization.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [MaterialModule, BrowserModule, FormsModule, NgbModule, BrowserAnimationsModule, ClipboardModule, MatFileUploadModule, HttpClientModule],
    exports: [MaterialModule],
    declarations: [
        AppComponent,
        CodeInputComponent,
        CodeHistoryComponent,
        CodeFormatComponent,
        ImageRecognizationComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
