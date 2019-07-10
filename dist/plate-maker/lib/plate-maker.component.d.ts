import { EventEmitter } from '@angular/core';
import { ContentInterface, WellInterface } from './plate-maker.models';
export declare class PlateMakerComponent {
    selectedWells: WellInterface[];
    wells: WellInterface[][];
    disableSelection: boolean;
    selected: EventEmitter<WellInterface[]>;
    deleted: EventEmitter<WellInterface[]>;
    keyEvent(event: KeyboardEvent): void;
    coordToStr: (index: number) => string;
    emitSelectedWells: () => void;
    stringifyContents: (contents: ContentInterface[]) => string;
}
