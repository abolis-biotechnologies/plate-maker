import { IterableDiffer, IterableDiffers } from '@angular/core';

// fixme see https://github.com/burgaard/string-algorithms/issues/13
import { longestCommonSubstring } from 'string-algorithms/src';


export class CommonSubstring {
  private values: Set<string>;
  private commonPattern: string;
  private differ: IterableDiffer<string>;

  constructor(iDiff: IterableDiffers) {
    this.differ = iDiff.find([]).create(null);
  }

  update(values: Set<string>) {
    if (this.differ.diff(values)) {
      delete this.commonPattern;  // delete cached result
      this.values = values;
    }
  }

  get pattern() {
    if (this.commonPattern === undefined) {
      const values = Array.from(this.values).filter(v => v);  // remove empty strings
      if (values?.length > 1) {
        this.commonPattern = longestCommonSubstring(values)[0];
      }
      this.commonPattern = this.commonPattern || '';  // mark pattern as computed
    }
    return this.commonPattern;
  }
}

export function truncate(value: string, limit: number, commonSubstring?: string): any {
  if (!value) {
    return value;
  }
  if (value.length > limit) {
    if (commonSubstring?.length > 2 && commonSubstring?.length < value.length) {
      let replacement;
      const charsLeft = Math.max(0, limit - (value.length - commonSubstring.length)) - 1;
      if (charsLeft > 0) {
        if (value.indexOf(commonSubstring) === 0) {
          replacement = commonSubstring.substring(0, commonSubstring.length - charsLeft);
        } else {
          replacement = commonSubstring.substring(charsLeft, commonSubstring.length);
        }
      } else {
        replacement = commonSubstring;
      }
      value = value.replace(replacement, '*');
    }
    if (value.length > limit) {
      return value.substring(0, limit - 2) + '..';
    } else {
      return value;
    }
  } else {
    return value;
  }
}
