/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
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
        { type: Pipe, args: [{
                    name: 'truncate'
                },] }
    ];
    return TruncatePipe;
}());
export { TruncatePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1bmNhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhYm9saXMvcGxhdGUtbWFrZXIvIiwic291cmNlcyI6WyJsaWIvbWlzYy90cnVuY2F0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRDtJQUFBO0lBVUEsQ0FBQzs7Ozs7O0lBTEMsZ0NBQVM7Ozs7O0lBQVQsVUFBVSxLQUFVLEVBQUUsS0FBYTtRQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzFFLENBQUM7O2dCQVJGLElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsVUFBVTtpQkFDakI7O0lBUUQsbUJBQUM7Q0FBQSxBQVZELElBVUM7U0FQWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICd0cnVuY2F0ZSdcbn0pXG5leHBvcnQgY2xhc3MgVHJ1bmNhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGxpbWl0OiBudW1iZXIpOiBhbnkge1xuICAgIGlmICghdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IGxpbWl0ID8gdmFsdWUuc3Vic3RyaW5nKDAsIGxpbWl0KSArICcuLi4nIDogdmFsdWU7XG4gIH1cblxufVxuIl19