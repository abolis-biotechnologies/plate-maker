/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
export class TruncatePipe {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1bmNhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhYm9saXMvcGxhdGUtbWFrZXIvIiwic291cmNlcyI6WyJsaWIvbWlzYy90cnVuY2F0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRCxNQUFNLE9BQU8sWUFBWTs7Ozs7O0lBRXZCLFNBQVMsQ0FBQyxLQUFVLEVBQUUsS0FBYTtRQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzFFLENBQUM7OztZQVJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsVUFBVTthQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAndHJ1bmNhdGUnXG59KVxuZXhwb3J0IGNsYXNzIFRydW5jYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBsaW1pdDogbnVtYmVyKTogYW55IHtcbiAgICBpZiAoIXZhbHVlKSB7IHJldHVybjsgfVxuICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiBsaW1pdCA/IHZhbHVlLnN1YnN0cmluZygwLCBsaW1pdCkgKyAnLi4uJyA6IHZhbHVlO1xuICB9XG5cbn1cbiJdfQ==