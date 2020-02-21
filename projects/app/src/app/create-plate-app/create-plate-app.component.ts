import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Content, createEmptyPlate, getGroup, Group, Well } from '../shared/plate-app.models';

@Component({
  selector: 'app-create-plate',
  templateUrl: './create-plate-app.component.html'
})
export class CreatePlateAppComponent implements OnDestroy {

  plate: Well[][] = [];
  dimensions = {24: {rows: 4, cols: 6}, 96: {rows: 8, cols: 12}};
  groups: Group[] = [];
  selectedWells: Well[];
  objectControl: FormControl = new FormControl({value: '', disabled: true});
  otherObjectControl: FormControl = new FormControl({value: '', disabled: true});
  objectValues = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];
  otherObjectValues = ['Alpha', 'Beta', 'Gamma', 'Delta'];
  printed = false;
  subscriptions: Subscription[] = [];

  constructor() {
    this.plate = createEmptyPlate(this.dimensions['96']);
    this.subscriptions.push(
      this.objectControl.valueChanges.subscribe(
        () => this.fillSelectedWells('Main Object', this.objectControl, 'white-text', true),
        err => console.log(err)
      ),
      this.otherObjectControl.valueChanges.subscribe(
        () => this.fillSelectedWells('Other Object', this.otherObjectControl, 'black-text'),
        err => console.log(err)
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  selected(wells: Well[]): void {
    this.selectedWells = wells;
    if (this.selectedWells && this.selectedWells.length) {
      this.objectControl.enable({emitEvent: false});
      this.otherObjectControl.enable({emitEvent: false});
    } else {
      this.objectControl.disable({emitEvent: false});
      this.otherObjectControl.disable({emitEvent: false});
    }
    if (this.selectedWellsHaveSame(this.selectedWells)) {
      this.objectControl.patchValue(this.selectedWells[0]?.contents[0]?.value, {emitEvent: false});
      // contents[0] === otherObject when it is the only control defined, otherwise contents[0] === mainObject, contents[1] = otherObject
      if (this.selectedWells[0]?.contents.length > 1) {
        this.otherObjectControl.patchValue(this.selectedWells[0]?.contents[1]?.value, {emitEvent: false});
      } else {
        this.otherObjectControl.patchValue(this.selectedWells[0]?.contents[0]?.value, {emitEvent: false});
      }
    } else {
      this.objectControl.reset();
      this.otherObjectControl.reset();
    }
  }

  fillSelectedWells(type: string, obj: FormControl, mdb_classes, colorizeWellBackground = false): void {
    if (this.selectedWells !== undefined) {
      const content = new Content(type, obj.value, mdb_classes);
      if (colorizeWellBackground) {
        this.colorizeWell(content);
      }
      this.selectedWells.forEach(selectedWell => {
        const contentIndex = selectedWell.contents.findIndex((c) => c.type === content.type);
        if (contentIndex === -1) {
          selectedWell.contents.push(content);
        } else {
          selectedWell.contents[contentIndex] = content;
        }
        selectedWell.contents.sort((c1, c2) => c1.type.localeCompare(c2.type));
      });
    }
  }

  colorizeWell(obj: Content): void {
    const group: Group = getGroup(this.groups, obj.value);
    this.selectedWells.forEach(selectedWell => selectedWell.bgColor = obj.value !== '' ? group.color : '#ffffff');
  }

  savePlate(): void {
    this.printed = true;
    console.log(this.plate);
    setTimeout(() => this.printed = false, 3000);
  }

  clearWells(wells: Well[]): void {
    this.selectedWells = wells;
    this.selectedWells.forEach(selectedWell => {
      selectedWell.contents = [];
      selectedWell.bgColor = '#ffffff';
    });
  }

  selectedWellsHaveSame(wells: Well[]) {
    return new Set(wells.map(w => w.contents.map(c => c.value).join())).size < 2;
  }

}
