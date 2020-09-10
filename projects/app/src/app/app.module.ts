import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { DragToSelectModule } from 'ngx-drag-to-select';
import { NgxPopperModule } from 'ngx-popper';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { PlateMakerModule } from '@abolis/plate-maker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreatePlateAppComponent } from './create-plate-app/create-plate-app.component';
import { DisplayPlateAppComponent } from './display-plate-app/display-plate-app.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragToSelectModule.forRoot(),
    NgxPopperModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    PlateMakerModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    CreatePlateAppComponent,
    DisplayPlateAppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
