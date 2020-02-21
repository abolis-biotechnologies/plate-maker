import {
  Component,
  DoCheck,
  EventEmitter,
  HostListener,
  Input,
  IterableDiffer,
  IterableDiffers,
  Output,
} from '@angular/core';

import { bounceInRightOnEnterAnimation, bounceOutRightOnLeaveAnimation } from 'angular-animations';

import { ContentInterface, KEY_CODE, WellInterface } from './plate-maker.models';

@Component({
  selector: 'lib-plate-maker',
  templateUrl: './plate-maker.component.html',
  styleUrls: ['./plate-maker.component.scss'],
  animations: [bounceInRightOnEnterAnimation(), bounceOutRightOnLeaveAnimation()]
})
export class PlateMakerComponent implements DoCheck {

  selectedWells: WellInterface[];
  contentsDetails: string[];
  iterableDiffer: IterableDiffer<any>;
  @Input() wells: WellInterface[][];
  @Input() disableSelection = false;
  @Input() truncateLimit = 9;
  @Output() selected: EventEmitter<WellInterface[]> = new EventEmitter();
  @Output() deleted: EventEmitter<WellInterface[]> = new EventEmitter();

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    if ((event.target as HTMLElement).tagName === 'BODY' && (event.code === KEY_CODE.Delete || event.code === KEY_CODE.Backspace)) {
      this.deleted.emit(this.selectedWells);
    }
  }

  constructor(private _iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngDoCheck(): void {
    if (this.selectedWells && this.selectedWells.length === 1) {
      const changes = this.iterableDiffer.diff(this.selectedWells[0].contents);
      if (changes) {
        this.showContentsDetails(this.selectedWells[0].contents);
      }
    } else {
      delete this.contentsDetails;
    }
  }

  coordToStr = (index: number): string => `${String.fromCharCode(index + 65)}`;

  emitSelectedWells = (): void => this.selected.emit(this.selectedWells);

  showContentsDetails(contents: ContentInterface[]) {
    this.contentsDetails = this.stringifyContents(contents);
  }

  stringifyContents(contents: ContentInterface[]): string[] {
    const contentsDetails = [];
    if (contents.length > 0) {
      contents.forEach(c => contentsDetails.push(`<span class="font-weight-bold">${c.type}</span>: ${c.value}`));
      return contentsDetails;
    }
    return ['Well is empty'];
  }
}
