import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [MaterialModule, BrowserModule, FormsModule, NgbModule, BrowserAnimationsModule],
  exports: [MaterialModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
