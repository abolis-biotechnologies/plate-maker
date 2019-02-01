import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToasterModule } from 'angular2-toaster';

import { DesignService, SharedClientModule } from '@abolis/shared-client';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ToasterModule.forRoot(),
    AppRoutingModule,
    SharedClientModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [DesignService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    (<any>window).awsome = {};
  }
}
