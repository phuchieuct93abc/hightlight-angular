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
import {FileDropModule} from "ngx-file-drop";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {ThemeChooserComponent} from "./theme-chooser/theme-chooser.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule,
        BrowserAnimationsModule,
        ClipboardModule,
        MatFileUploadModule,
        HttpClientModule,
        FileDropModule,
        NgZorroAntdModule],
    exports: [MaterialModule],
    declarations: [
        AppComponent,
        CodeInputComponent,
        CodeHistoryComponent,
        CodeFormatComponent,
        ImageRecognizationComponent,
        ThemeChooserComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
