(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('ngx-drag-to-select'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@abolis/plate-maker', ['exports', '@angular/common', 'ngx-drag-to-select', '@angular/core'], factory) :
    (factory((global.abolis = global.abolis || {}, global.abolis['plate-maker'] = {}),global.ng.common,global['ngx-drag-to-select'],global.ng.core));
}(this, (function (exports,common,ngxDragToSelect,core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var KEY_CODE = {
        Delete: 'Delete',
        Backspace: 'Backspace',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PlateMakerComponent = /** @class */ (function () {
        function PlateMakerComponent() {
            var _this = this;
            this.disableSelection = false;
            this.selected = new core.EventEmitter();
            this.deleted = new core.EventEmitter();
            this.coordToStr = ( /**
             * @param {?} index
             * @return {?}
             */function (index) { return "" + String.fromCharCode(index + 65); });
            this.emitSelectedWells = ( /**
             * @return {?}
             */function () { return _this.selected.emit(_this.selectedWells); });
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
            { type: core.Component, args: [{
                        selector: 'lib-plate-maker',
                        template: "<!-- dts (Drag-to-Select) https://www.npmjs.com/package/ngx-drag-to-select -->\n<dts-select-container class=\"plate-container pt-5 pl-5 pb-3 pr-3\"\n                      [(selectedItems)]=\"selectedWells\"\n                      [disabled]=\"disableSelection\"\n                      (selectionEnded)=\"emitSelectedWells()\"\n                      *ngIf=\"wells.length\">\n  <div class=\"plate-row justify-content-center\" *ngFor=\"let row of wells; let i = index\">\n    <div class=\"headers row-index\">{{coordToStr(i)}}</div>\n    <div class=\"plate-col\"\n         *ngFor=\"let col of row; let j = index\"\n         [dtsSelectItem]=\"col\"\n         [style.background]=\"col.bgColor\"\n         [style.cursor]=\"disableSelection ? 'not-allowed' : 'pointer'\">\n      <div class=\"headers col-index\" *ngIf=\"i === 0\">{{j + 1}}</div>\n      <div *ngFor=\"let content of col.contents\"\n           [style.color]=\"content.textColor\"\n           [style.font-size]=\"wells[0].length > 6  ? '12px' : '16px'\">\n        {{content.value | lowercase | truncate : 10}}\n      </div>\n    </div>\n  </div>\n</dts-select-container>\n",
                        styles: ["*{-webkit-border-sizing:border-box;-moz-border-sizing:border-box;-ms-border-sizing:border-box;-o-border-sizing:border-box;border-sizing:border-box}.plate-container{border-radius:5px}.plate-row{display:flex;flex-direction:row}.plate-col{display:flex;flex-direction:column;height:80px;flex:1 0 1px;margin:4px;text-align:center;align-items:center;justify-content:center;border:2px solid #ddd;font-weight:700;-webkit-text-shadow:-2px 1px 10px rgba(0,0,0,.62);-moz-text-shadow:-2px 1px 10px rgba(0,0,0,.62);-ms-text-shadow:-2px 1px 10px rgba(0,0,0,.62);-o-text-shadow:-2px 1px 10px rgba(0,0,0,.62);text-shadow:-2px 1px 10px rgba(0,0,0,.62)}.headers{font-weight:700;position:absolute;font-size:14px;color:#000;-webkit-text-shadow:none;-moz-text-shadow:none;-ms-text-shadow:none;-o-text-shadow:none;text-shadow:none}.headers.row-index{left:20px;margin-top:35px}.headers.col-index{top:15px}"]
                    }] }
        ];
        PlateMakerComponent.propDecorators = {
            wells: [{ type: core.Input }],
            disableSelection: [{ type: core.Input }],
            selected: [{ type: core.Output }],
            deleted: [{ type: core.Output }],
            keyEvent: [{ type: core.HostListener, args: ['window:keyup', ['$event'],] }]
        };
        return PlateMakerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TruncatePipe = /** @class */ (function () {
        function TruncatePipe() {
        }
        /**
         * @param {?} value
         * @param {?} limit
         * @return {?}
         */
        TruncatePipe.prototype.transform = /**
         * @param {?} value
         * @param {?} limit
         * @return {?}
         */
            function (value, limit) {
                if (!value) {
                    return;
                }
                return value.length > limit ? value.substring(0, limit) + '...' : value;
            };
        TruncatePipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'truncate'
                    },] }
        ];
        return TruncatePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PlateMakerModule = /** @class */ (function () {
        function PlateMakerModule() {
        }
        PlateMakerModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            PlateMakerComponent,
                            TruncatePipe
                        ],
                        imports: [
                            common.CommonModule,
                            ngxDragToSelect.DragToSelectModule
                        ],
                        exports: [PlateMakerComponent]
                    },] }
        ];
        return PlateMakerModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.PlateMakerComponent = PlateMakerComponent;
    exports.PlateMakerModule = PlateMakerModule;
    exports.KEY_CODE = KEY_CODE;
    exports.ɵa = TruncatePipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=abolis-plate-maker.umd.js.map