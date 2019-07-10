/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { KEY_CODE } from './plate-maker.models';
var PlateMakerComponent = /** @class */ (function () {
    function PlateMakerComponent() {
        var _this = this;
        this.disableSelection = false;
        this.selected = new EventEmitter();
        this.deleted = new EventEmitter();
        this.coordToStr = (/**
         * @param {?} index
         * @return {?}
         */
        function (index) { return "" + String.fromCharCode(index + 65); });
        this.emitSelectedWells = (/**
         * @return {?}
         */
        function () { return _this.selected.emit(_this.selectedWells); });
        this.stringifyContents = (/**
         * @param {?} contents
         * @return {?}
         */
        function (contents) {
            /** @type {?} */
            var tooltipContents = [];
            if (contents.length > 0) {
                contents.forEach((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return tooltipContents.push(c.type + ": " + c.value); }));
                return tooltipContents.join('<br>');
            }
            return 'Well is empty';
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    PlateMakerComponent.prototype.keyEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.code === KEY_CODE.Delete || event.code === KEY_CODE.Backspace) {
            this.deleted.emit(this.selectedWells);
        }
    };
    PlateMakerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-plate-maker',
                    template: "<!-- dts (Drag-to-Select) https://www.npmjs.com/package/ngx-drag-to-select -->\n<dts-select-container class=\"plate-container pt-5 pl-5 pb-3 pr-3\"\n                      [(selectedItems)]=\"selectedWells\"\n                      [disabled]=\"disableSelection\"\n                      (selectionEnded)=\"emitSelectedWells()\"\n                      *ngIf=\"wells.length\">\n  <div class=\"plate-row justify-content-center\" *ngFor=\"let row of wells; let i = index\">\n    <div class=\"headers row-index\">{{coordToStr(i)}}</div>\n    <!-- tooltip, placement, show and hide delay is part of ng2-tooltip-directive (https://www.npmjs.com/package/ng2-tooltip-directive)-->\n    <div class=\"plate-col\"\n         *ngFor=\"let col of row; let j = index\"\n         [dtsSelectItem]=\"col\"\n         [style.background]=\"col.bgColor\"\n         [style.cursor]=\"disableSelection ? 'not-allowed' : 'pointer'\"\n         [tooltip]=\"stringifyContents(col.contents)\"\n         placement=\"top\"\n         show-delay=\"500\"\n         hide-delay=\"0\">\n      <div class=\"headers col-index\" *ngIf=\"i === 0\">{{j + 1}}</div>\n      <div *ngFor=\"let content of col.contents\"\n           [style.color]=\"content.textColor\"\n           [style.font-size]=\"wells[0].length > 6  ? '12px' : '16px'\">\n        {{content.value | truncate : 10}}\n      </div>\n    </div>\n  </div>\n</dts-select-container>\n",
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
    return PlateMakerComponent;
}());
export { PlateMakerComponent };
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
    /** @type {?} */
    PlateMakerComponent.prototype.stringifyContents;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGUtbWFrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFib2xpcy9wbGF0ZS1tYWtlci8iLCJzb3VyY2VzIjpbImxpYi9wbGF0ZS1tYWtlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJGLE9BQU8sRUFBb0IsUUFBUSxFQUFpQixNQUFNLHNCQUFzQixDQUFDO0FBRWpGO0lBQUE7UUFBQSxpQkFnQ0M7UUF2QlUscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGFBQVEsR0FBa0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3RCxZQUFPLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUM7UUFRdEUsZUFBVTs7OztRQUFHLFVBQUMsS0FBYSxJQUFhLE9BQUEsS0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUcsRUFBcEMsQ0FBb0MsRUFBQztRQUU3RSxzQkFBaUI7OztRQUFHLGNBQVksT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLEVBQXRDLENBQXNDLEVBQUM7UUFFdkUsc0JBQWlCOzs7O1FBQUcsVUFBQyxRQUE0Qjs7Z0JBQ3pDLGVBQWUsR0FBRyxFQUFFO1lBQzFCLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZCLFFBQVEsQ0FBQyxPQUFPOzs7O2dCQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsZUFBZSxDQUFDLElBQUksQ0FBSSxDQUFDLENBQUMsSUFBSSxVQUFLLENBQUMsQ0FBQyxLQUFPLENBQUMsRUFBN0MsQ0FBNkMsRUFBQyxDQUFDO2dCQUNyRSxPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDckM7WUFDRCxPQUFPLGVBQWUsQ0FBQztRQUN6QixDQUFDLEVBQUE7SUFFSCxDQUFDOzs7OztJQW5CMkMsc0NBQVE7Ozs7SUFBbEQsVUFBbUQsS0FBb0I7UUFDckUsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ3ZFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7O2dCQWpCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsaTRDQUEyQzs7aUJBRTVDOzs7d0JBSUUsS0FBSzttQ0FDTCxLQUFLOzJCQUNMLE1BQU07MEJBQ04sTUFBTTsyQkFFTixZQUFZLFNBQUMsY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDOztJQW1CMUMsMEJBQUM7Q0FBQSxBQWhDRCxJQWdDQztTQTNCWSxtQkFBbUI7OztJQUU5Qiw0Q0FBK0I7O0lBQy9CLG9DQUFrQzs7SUFDbEMsK0NBQWtDOztJQUNsQyx1Q0FBdUU7O0lBQ3ZFLHNDQUFzRTs7SUFRdEUseUNBQTZFOztJQUU3RSxnREFBdUU7O0lBRXZFLGdEQU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250ZW50SW50ZXJmYWNlLCBLRVlfQ09ERSwgV2VsbEludGVyZmFjZSB9IGZyb20gJy4vcGxhdGUtbWFrZXIubW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLXBsYXRlLW1ha2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BsYXRlLW1ha2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGxhdGUtbWFrZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQbGF0ZU1ha2VyQ29tcG9uZW50IHtcblxuICBzZWxlY3RlZFdlbGxzOiBXZWxsSW50ZXJmYWNlW107XG4gIEBJbnB1dCgpIHdlbGxzOiBXZWxsSW50ZXJmYWNlW11bXTtcbiAgQElucHV0KCkgZGlzYWJsZVNlbGVjdGlvbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxXZWxsSW50ZXJmYWNlW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVsZXRlZDogRXZlbnRFbWl0dGVyPFdlbGxJbnRlcmZhY2VbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleXVwJywgWyckZXZlbnQnXSkga2V5RXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuY29kZSA9PT0gS0VZX0NPREUuRGVsZXRlIHx8IGV2ZW50LmNvZGUgPT09IEtFWV9DT0RFLkJhY2tzcGFjZSkge1xuICAgICAgdGhpcy5kZWxldGVkLmVtaXQodGhpcy5zZWxlY3RlZFdlbGxzKTtcbiAgICB9XG4gIH1cblxuICBjb29yZFRvU3RyID0gKGluZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7U3RyaW5nLmZyb21DaGFyQ29kZShpbmRleCArIDY1KX1gO1xuXG4gIGVtaXRTZWxlY3RlZFdlbGxzID0gKCk6IHZvaWQgPT4gdGhpcy5zZWxlY3RlZC5lbWl0KHRoaXMuc2VsZWN0ZWRXZWxscyk7XG5cbiAgc3RyaW5naWZ5Q29udGVudHMgPSAoY29udGVudHM6IENvbnRlbnRJbnRlcmZhY2VbXSk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgdG9vbHRpcENvbnRlbnRzID0gW107XG4gICAgaWYgKGNvbnRlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnRlbnRzLmZvckVhY2goYyA9PiB0b29sdGlwQ29udGVudHMucHVzaChgJHtjLnR5cGV9OiAke2MudmFsdWV9YCkpO1xuICAgICAgcmV0dXJuIHRvb2x0aXBDb250ZW50cy5qb2luKCc8YnI+Jyk7XG4gICAgfVxuICAgIHJldHVybiAnV2VsbCBpcyBlbXB0eSc7XG4gIH1cblxufVxuIl19