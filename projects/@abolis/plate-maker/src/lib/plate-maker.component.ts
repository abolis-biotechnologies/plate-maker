import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { KEY_CODE, WellInterface } from './plate-maker.models';

@Component({
  selector: 'lib-plate-maker',
  templateUrl: './plate-maker.component.html',
  styleUrls: ['./plate-maker.component.scss']
})
export class PlateMakerComponent {

  selectedWells: WellInterface[];
  @Input() wells: WellInterface[][];
  @Input() disableSelection = false;
  @Output() selected: EventEmitter<WellInterface[]> = new EventEmitter();
  @Output() deleted: EventEmitter<WellInterface[]> = new EventEmitter();
  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    if (event.code === KEY_CODE.Delete || event.code === KEY_CODE.Backspace) {
      this.deleted.emit(this.selectedWells);
    }
  }

  coordToStr = (index: number): string => `${String.fromCharCode(index + 65)}`;

  emitSelectedWells = (): void => this.selected.emit(this.selectedWells);
}
