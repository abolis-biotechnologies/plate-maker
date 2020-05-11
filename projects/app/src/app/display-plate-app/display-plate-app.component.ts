import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Content, createEmptyPlate, DummyTruncateContent, getGroup, Group, Well } from '../shared/plate-app.models';

@Component({
  selector: 'app-display-plate-app',
  templateUrl: './display-plate-app.component.html',
  styleUrls: ['./display-plate-app.component.scss'],
  animations: [
    trigger('divState', [
      state('normal', style({})),
      state('selected', style({
        transform: 'rotate(-1deg) scale(1.1) translateX(15px)',
        background: '#11c27c',
        'font-weight': 'bold'
      })),
      transition('normal <=> selected', animate(200)),
      transition('selected <=> normal', animate(200))
    ])
  ]
})
export class DisplayPlateAppComponent implements OnDestroy {

  barcodes = [
    'mediums',
    'ZMXmqTuXL4biesgPeSYl', 'bUwPZ7qLrd5n6Ii7gyfZ', 'GDTI8gGVKZqXvwmFEhIP', 'ccDzQINtM7tgmk5gmv7S', 'BjDn8z9499rzIxEozO9m',
    'JNn4BTkkrDak2kfFUaXQ', 'l0Gp0slNtzX2qePY06JV', 'lT3q10tIYbJNSCPBvjAS', '63xz27yBOqF7y84fGl4v', '6jDRaqx3ulBFblCw1Htl',
    'CR3vru0lcR336h9mUwc5', '8GxE9M3Hn1C5R700vz0t', 'cyVm8CccTNUi4EuKkwbM', 'x9qRVojflMJSkCH0OpGM', 't3JvijNVMIA2g93pAFkK',
    'yLf7Zn2yHcJSAE051fj6', '9b6vGHpfi4dcRq58Xptu', 'spszYQyuUYrY7e5KZcRf', 'gamlh7P4mRJErw1ZSsHD', '5NRxvsibaug9wj0lcmKQ'
  ];
  displayedBarcodes: string[] = [];
  customPlates = {
    mediums: [
      'oooooooooooo - 48h',
      'oooooooooooo - 108h',
      'oooooooooooo - 48h',
      'oooooooooooo - 108h',
      'oooooooooooo - 108h',
      'oooooooooooo - 168h',
      'oooooooooooo - 168h',
    ],
  };
  plate: Well[][] = [];
  plateShape = {rows: 8, cols: 12};
  filterBarcodesControl = new FormControl();
  truncateControl = new FormControl();
  tickControl = new FormControl();
  tickEmitter: EventEmitter<void>;
  selectedBarcode: string;
  groups: Group[] = [];
  subscriptions = [];

  constructor() {
    this.initPlate();
    this.displayedBarcodes = this.barcodes;
    this.subscriptions.push(
      this.filterBarcodesControl.valueChanges.subscribe(
        barcode => this.filterBarcodes(barcode),
        error => console.log(error)
      ),
      this.truncateControl.valueChanges.subscribe(
        () => this.updatePlate()
      ),
      this.tickControl.valueChanges.subscribe(
        controlTick => {
          if (controlTick) {
            this.tickEmitter = new EventEmitter();
          } else {
            delete this.tickEmitter;
          }
        }
      ),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onSelectedBarcode(barcode: string): void {
    this.selectedBarcode = barcode;
    this.groups = [];
    this.updatePlate();
  }

  filterBarcodes(barcode: string): void {
    if (barcode.trim()) {
      this.displayedBarcodes = this.barcodes.filter(b => b.toLowerCase().indexOf(barcode.trim().toLowerCase()) > -1);
    } else {
      this.displayedBarcodes = this.barcodes;
    }
  }

  updatePlate(): void {
    this.initPlate();
    const ContentClass = this.truncateControl.value ? DummyTruncateContent : Content;
    this.plate.forEach((row, rowIndex) => {
      row.forEach((well, colIndex) => {
        let objectValue;
        if (this.customPlates.hasOwnProperty(this.selectedBarcode)) {
          objectValue = this.customPlates[this.selectedBarcode][rowIndex + colIndex * this.plateShape.rows] || '';
        } else {
          objectValue = this.selectedBarcode + colIndex.toString();
        }
        well.contents.push(
          new ContentClass('objectType', objectValue, 'white-text')
        );
        if (objectValue) {
          const group = getGroup(this.groups, objectValue);
          well.bgColor = group.color;
        }
        well.row = rowIndex;
        well.column = colIndex;
      });
    });
  }

  private initPlate(): void {
    this.plate = createEmptyPlate(this.plateShape);
  }

}
