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
}

export enum KEY_CODE {
  Delete = 'Delete',
  Backspace = 'Backspace'
}
