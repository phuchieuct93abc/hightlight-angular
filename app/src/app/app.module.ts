import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeInputComponent } from "./code-input/code-input.component";
import { CodeHistoryComponent } from "./code-history/code-history.component";
import { CodeFormatComponent } from "./code-format/code-format.component";
import { ImageRecognizationComponent } from "./code-input/image-recognization/image-recognization.component";
import { HttpClientModule } from "@angular/common/http";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { ThemeChooserComponent } from "./theme-chooser/theme-chooser.component";
import { ThumbnailComponent } from "./code-input/image-recognization/thumbnail/thumbnail.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { ToolkitComponent } from './toolkit/toolkit.component';
import { StorageModule } from '@ngx-pwa/local-storage';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgZorroAntdModule,
        NzCodeEditorModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        StorageModule.forRoot({ IDBNoWrap: true })

    ],
    exports: [MaterialModule],
    declarations: [
        AppComponent,
        CodeInputComponent,
        CodeHistoryComponent,
        CodeFormatComponent,
        ImageRecognizationComponent,
        ThemeChooserComponent,
        ThumbnailComponent,
        CodeEditorComponent,
        LanguageSelectorComponent,
        ToolkitComponent

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
