export interface WellInterface {
  row: number;
  column: number;
  bgColor: string;
  contents: ContentInterface[];
}

export interface ContentInterface {
  type: string;
  value: string;
  mdb_classes: string;

  /**
   * Override the default implementation of well content value truncation.
   *
   * Rationale: when the content value of a well is too long to be fully displayed within the space reserved to that
   * well on the screen, plate-maker needs to make a decision about what part of the value to truncate (cut off).
   *
   * If you do not provide this method, the default plate-maker implementation will kick-in:
   * look for the longest substring across all the wells of the plate, and replace it with a star (*).
   * This default implementation relies on https://www.npmjs.com/package/string-algorithms (longestCommonSubstring).
   *
   * @param limit: the maximum length of the truncated value (string) recommended by plate-maker.
   */
  truncatedValue?(limit: number): string;
}

export enum KEY_CODE {
  Delete = 'Delete',
  Backspace = 'Backspace'
}
