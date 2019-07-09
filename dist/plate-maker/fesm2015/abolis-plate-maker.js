import { CommonModule } from '@angular/common';
import { DragToSelectModule } from 'ngx-drag-to-select';
import { Component, EventEmitter, HostListener, Input, Output, Pipe, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const KEY_CODE = {
    Delete: 'Delete',
    Backspace: 'Backspace',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PlateMakerComponent {
    constructor() {
        this.disableSelection = false;
        this.selected = new EventEmitter();
        this.deleted = new EventEmitter();
        this.coordToStr = (/**
         * @param {?} index
         * @return {?}
         */
        (index) => `${String.fromCharCode(index + 65)}`);
        this.emitSelectedWells = (/**
         * @return {?}
         */
        () => this.selected.emit(this.selectedWells));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyEvent(event) {
        if (event.code === KEY_CODE.Delete || event.code === KEY_CODE.Backspace) {
            this.deleted.emit(this.selectedWells);
        }
    }
}
PlateMakerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-plate-maker',
                template: "<!-- dts (Drag-to-Select) https://www.npmjs.com/package/ngx-drag-to-select -->\n<dts-select-container class=\"plate-container pt-5 pl-5 pb-3 pr-3\"\n                      [(selectedItems)]=\"selectedWells\"\n                      [disabled]=\"disableSelection\"\n                      (selectionEnded)=\"emitSelectedWells()\"\n                      *ngIf=\"wells.length\">\n  <div class=\"plate-row justify-content-center\" *ngFor=\"let row of wells; let i = index\">\n    <div class=\"headers row-index\">{{coordToStr(i)}}</div>\n    <div class=\"plate-col\"\n         *ngFor=\"let col of row; let j = index\"\n         [dtsSelectItem]=\"col\"\n         [style.background]=\"col.bgColor\"\n         [style.cursor]=\"disableSelection ? 'not-allowed' : 'pointer'\">\n      <div class=\"headers col-index\" *ngIf=\"i === 0\">{{j + 1}}</div>\n      <div *ngFor=\"let content of col.contents\"\n           [style.color]=\"content.textColor\"\n           [style.font-size]=\"wells[0].length > 6  ? '12px' : '16px'\">\n        {{content.value | lowercase | truncate : 10}}\n      </div>\n    </div>\n  </div>\n</dts-select-container>\n",
                styles: ["*{-webkit-border-sizing:border-box;-moz-border-sizing:border-box;-ms-border-sizing:border-box;-o-border-sizing:border-box;border-sizing:border-box}.plate-container{border-radius:5px}.plate-row{display:flex;flex-direction:row}.plate-col{display:flex;flex-direction:column;height:80px;flex:1 0 1px;margin:4px;text-align:center;align-items:center;justify-content:center;border:2px solid #ddd;font-weight:700;-webkit-text-shadow:-2px 1px 10px rgba(0,0,0,.62);-moz-text-shadow:-2px 1px 10px rgba(0,0,0,.62);-ms-text-shadow:-2px 1px 10px rgba(0,0,0,.62);-o-text-shadow:-2px 1px 10px rgba(0,0,0,.62);text-shadow:-2px 1px 10px rgba(0,0,0,.62)}.headers{font-weight:700;position:absolute;font-size:14px;color:#000;-webkit-text-shadow:none;-moz-text-shadow:none;-ms-text-shadow:none;-o-text-shadow:none;text-shadow:none}.headers.row-index{left:20px;margin-top:35px}.headers.col-index{top:15px}"]
            }] }
];
PlateMakerComponent.propDecorators = {
    wells: [{ type: Input }],
    disableSelection: [{ type: Input }],
    selected: [{ type: Output }],
    deleted: [{ type: Output }],
    keyEvent: [{ type: HostListener, args: ['window:keyup', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TruncatePipe {
    /**
     * @param {?} value
     * @param {?} limit
     * @return {?}
     */
    transform(value, limit) {
        if (!value) {
            return;
        }
        return value.length > limit ? value.substring(0, limit) + '...' : value;
    }
}
TruncatePipe.decorators = [
    { type: Pipe, args: [{
                name: 'truncate'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PlateMakerModule {
}
PlateMakerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    PlateMakerComponent,
                    TruncatePipe
                ],
                imports: [
                    CommonModule,
                    DragToSelectModule
                ],
                exports: [PlateMakerComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PlateMakerComponent, PlateMakerModule, KEY_CODE, TruncatePipe as ɵa };

//# sourceMappingURL=abolis-plate-maker.js.map