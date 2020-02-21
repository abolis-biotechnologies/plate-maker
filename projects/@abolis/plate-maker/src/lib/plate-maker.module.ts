import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragToSelectModule } from 'ngx-drag-to-select';
import { NgxPopperModule } from 'ngx-popper';

import { PlateMakerComponent } from './plate-maker.component';
import { TruncatePipe } from './misc/truncate.pipe';

@NgModule({
  declarations: [
    PlateMakerComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    DragToSelectModule,
    NgxPopperModule
  ],
  exports: [PlateMakerComponent]
})
export class PlateMakerModule {
}
