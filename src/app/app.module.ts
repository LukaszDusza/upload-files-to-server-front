import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainService } from './main.service';
import { HttpClientModule } from '@angular/common/http';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
