import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragToSelectModule } from 'ngx-drag-to-select';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { PlateMakerComponent } from './plate-maker.component';

@NgModule({
  declarations: [
    PlateMakerComponent,
  ],
  imports: [
    CommonModule,
    DragToSelectModule,
    MDBBootstrapModule
  ],
  exports: [PlateMakerComponent]
})
export class PlateMakerModule {
}

// To skip error "Generic type 'ModuleWithProviders<T>' requires 1 type argument(s)" with drag-to-select
// https://stackoverflow.com/questions/62755093/angular-error-generic-type-modulewithproviderst-requires-1-type-arguments
// todo: remove the codes below when NGX-DRAG-TO-SELECT is compatible with Angular 10+
declare module '@angular/core' {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: (Provider | EnvironmentProviders)[];
  }
}
