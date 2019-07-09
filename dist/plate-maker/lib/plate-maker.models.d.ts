export interface WellInterface {
    row: number;
    column: number;
    bgColor: string;
    contents: ContentInterface[];
}
export interface ContentInterface {
    type: string;
    value: string;
    textColor: string;
}
export declare enum KEY_CODE {
    Delete = "Delete",
    Backspace = "Backspace"
}
