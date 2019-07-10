import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragToSelectModule } from 'ngx-drag-to-select';
import { TooltipModule } from 'ng2-tooltip-directive';

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
    TooltipModule
  ],
  exports: [PlateMakerComponent]
})
export class PlateMakerModule {
}
