import {
  Component,
  DoCheck,
  EventEmitter,
  HostListener,
  Input,
  IterableDiffer,
  IterableDiffers,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { bounceInRightOnEnterAnimation, bounceOutRightOnLeaveAnimation } from 'angular-animations';

import { Subscription } from 'rxjs';

import { CommonSubstring, truncate } from './util';
import { ContentInterface, KEY_CODE, WellInterface } from './plate-maker.models';

@Component({
  selector: 'lib-plate-maker',
  templateUrl: './plate-maker.component.html',
  styleUrls: ['./plate-maker.component.scss'],
  animations: [bounceInRightOnEnterAnimation(), bounceOutRightOnLeaveAnimation()]
})
export class PlateMakerComponent implements DoCheck, OnChanges {
  selectedWells: WellInterface[];
  contentsDetails: string[];
  truncateLimit: number;
  contentDetailsDiffer: IterableDiffer<ContentInterface>;      // determine when to update content details
  commonSubstrings: Map<string, CommonSubstring> = new Map();  // map type => longest pattern substring between contents
  tickSubscription: Subscription;

  @Input() wells: WellInterface[][];
  @Input() disableSelection = false;
  @Input() tick: EventEmitter<void>;
  @Output() selected: EventEmitter<WellInterface[]> = new EventEmitter();
  @Output() deleted: EventEmitter<WellInterface[]> = new EventEmitter();

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    if ((event.target as HTMLElement).tagName === 'BODY' && (event.code === KEY_CODE.Delete || event.code === KEY_CODE.Backspace)) {
      this.deleted.emit(this.selectedWells);
    }
  }

  constructor(private _iterableDiffers: IterableDiffers) {
    this.contentDetailsDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['wells']) {
      this.truncateLimit = this.computeTruncateLimit(this.wells.length);
    }
    if (changes['tick']) {
      if (this.tickSubscription) {
        this.tickSubscription.unsubscribe();
      }
      if (this.tick) {
        this.tickSubscription = this.tick.subscribe(
          () => this.checkCommonSubstrings(),
          // if there is an error, let it crash all the way
        );
      }
    }
  }

  ngDoCheck(): void {
    if (this.wells?.length > 0) {
      if (!this.tick) {
        this.checkCommonSubstrings();
      }  // else we only run changes detection when an event is emitted by this.tick
    }
    if (this.selectedWells && this.selectedWells.length === 1) {
      if (this.contentDetailsDiffer.diff(this.selectedWells[0].contents)) {
        this.showContentsDetails(this.selectedWells[0].contents);
      }
    } else {
      delete this.contentsDetails;
    }
  }

  coordToStr(index: number): string {
    return `${String.fromCharCode(index + 65)}`;
  }

  emitSelectedWells(): void {
    this.selected.emit(this.selectedWells);
  }

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

  truncated(content: ContentInterface) {
    if (typeof content.truncatedValue === 'function') {
      return content.truncatedValue(this.truncateLimit);
    } else {
      return truncate(
        content.value,
        this.truncateLimit,
        this.commonSubstrings.get(content.type)?.pattern
      );
    }
  }

  private computeTruncateLimit(plateDimensionRows: number): number {
    return plateDimensionRows <= 6 ? 18 : 12;
  }

  private checkCommonSubstrings() {
    const contentsByType = new Map<string, Set<string>>();
    this.wells.forEach(row => row.forEach(w => w.contents.forEach(content => {
      if (!contentsByType.has(content.type)) {
        contentsByType.set(content.type, new Set<string>());
      }
      contentsByType.get(content.type).add(content.value);
    })));
    const keysToDelete = [];
    for (const key of this.commonSubstrings.keys()) {
      if (!contentsByType.has(key)) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(k => this.commonSubstrings.delete(k));
    for (const entry of contentsByType.entries()) {
      const contentType = entry[0];
      if (!this.commonSubstrings.has(contentType)) {
        this.commonSubstrings.set(contentType, new CommonSubstring(this._iterableDiffers));
      }
      this.commonSubstrings.get(contentType).update(entry[1]);
    }
  }
}
