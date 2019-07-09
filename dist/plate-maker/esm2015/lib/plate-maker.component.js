/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { KEY_CODE } from './plate-maker.models';
export class PlateMakerComponent {
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
if (false) {
    /** @type {?} */
    PlateMakerComponent.prototype.selectedWells;
    /** @type {?} */
    PlateMakerComponent.prototype.wells;
    /** @type {?} */
    PlateMakerComponent.prototype.disableSelection;
    /** @type {?} */
    PlateMakerComponent.prototype.selected;
    /** @type {?} */
    PlateMakerComponent.prototype.deleted;
    /** @type {?} */
    PlateMakerComponent.prototype.coordToStr;
    /** @type {?} */
    PlateMakerComponent.prototype.emitSelectedWells;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGUtbWFrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFib2xpcy9wbGF0ZS1tYWtlci8iLCJzb3VyY2VzIjpbImxpYi9wbGF0ZS1tYWtlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJGLE9BQU8sRUFBRSxRQUFRLEVBQWlCLE1BQU0sc0JBQXNCLENBQUM7QUFPL0QsTUFBTSxPQUFPLG1CQUFtQjtJQUxoQztRQVNXLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN4QixhQUFRLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0QsWUFBTyxHQUFrQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBT3RFLGVBQVU7Ozs7UUFBRyxDQUFDLEtBQWEsRUFBVSxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFDO1FBRTdFLHNCQUFpQjs7O1FBQUcsR0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFDO0lBQ3pFLENBQUM7Ozs7O0lBVDJDLFFBQVEsQ0FBQyxLQUFvQjtRQUNyRSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzs7O1lBaEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixxbkNBQTJDOzthQUU1Qzs7O29CQUlFLEtBQUs7K0JBQ0wsS0FBSzt1QkFDTCxNQUFNO3NCQUNOLE1BQU07dUJBQ04sWUFBWSxTQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7OztJQUx4Qyw0Q0FBK0I7O0lBQy9CLG9DQUFrQzs7SUFDbEMsK0NBQWtDOztJQUNsQyx1Q0FBdUU7O0lBQ3ZFLHNDQUFzRTs7SUFPdEUseUNBQTZFOztJQUU3RSxnREFBdUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEtFWV9DT0RFLCBXZWxsSW50ZXJmYWNlIH0gZnJvbSAnLi9wbGF0ZS1tYWtlci5tb2RlbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItcGxhdGUtbWFrZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vcGxhdGUtbWFrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wbGF0ZS1tYWtlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBsYXRlTWFrZXJDb21wb25lbnQge1xuXG4gIHNlbGVjdGVkV2VsbHM6IFdlbGxJbnRlcmZhY2VbXTtcbiAgQElucHV0KCkgd2VsbHM6IFdlbGxJbnRlcmZhY2VbXVtdO1xuICBASW5wdXQoKSBkaXNhYmxlU2VsZWN0aW9uID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPFdlbGxJbnRlcmZhY2VbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWxldGVkOiBFdmVudEVtaXR0ZXI8V2VsbEludGVyZmFjZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleXVwJywgWyckZXZlbnQnXSkga2V5RXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuY29kZSA9PT0gS0VZX0NPREUuRGVsZXRlIHx8IGV2ZW50LmNvZGUgPT09IEtFWV9DT0RFLkJhY2tzcGFjZSkge1xuICAgICAgdGhpcy5kZWxldGVkLmVtaXQodGhpcy5zZWxlY3RlZFdlbGxzKTtcbiAgICB9XG4gIH1cblxuICBjb29yZFRvU3RyID0gKGluZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7U3RyaW5nLmZyb21DaGFyQ29kZShpbmRleCArIDY1KX1gO1xuXG4gIGVtaXRTZWxlY3RlZFdlbGxzID0gKCk6IHZvaWQgPT4gdGhpcy5zZWxlY3RlZC5lbWl0KHRoaXMuc2VsZWN0ZWRXZWxscyk7XG59XG4iXX0=