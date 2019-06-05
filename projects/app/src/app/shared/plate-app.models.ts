import { WellInterface , ContentInterface} from '@abolis/plate-maker';

export const COLORS = [
  '#1abc9c',
  '#3498db',
  '#9b59b6',
  '#FF6633',
  '#E6331A',
  '#E6B333',
  '#2c3e50',
  '#FF33FF',
  '#FFB399',
  '#FF1A66',
  '#4D8066',
  '#ffe17a',
  '#6666FF',
  '#999966',
  '#00B3E6',
  '#991AFF',
  '#99FF99',
  '#3366E6',
  '#B34D4D',
  '#80B300',
  '#FF3380',
  '#E6B3B3',
  '#6680B3',
  '#FF99E6',
  '#4DB380',
  '#CCFF1A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#66664D',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#FF4D4D',
  '#00E680',
  '#809980',
  '#9900B3',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#4D80CC',
  '#E64D66',
  '#99E6E6',
  '#66991A',
];

export class Group {
  constructor(public objectValue: string,
              public color: string) {
  }
}

export class Well implements WellInterface {
  constructor(public row: number,
              public column: number,
              public bgColor: string,
              public contents: ContentInterface[] = [],
              public otherContents: ContentInterface[] = []) {
  }
}

export class Content implements ContentInterface {
  constructor(public type: string,
              public value: string,
              public textColor: string) {
  }
}

export function createEmptyPlate(dimensions: { rows: number, cols: number }): Well[][] {
  const plate = [];
  for (let row = 1; row <= dimensions.rows; row++) {
    const cols: Well[] = [];
    for (let col = 1; col <= dimensions.cols; col++) {
      cols.push(new Well(row, col, '#ffffff'));
    }
    plate.push(cols);
  }
  return plate;
}

export function getGroup(groups, objectValue): Group {
  let group = groups.find(g => g.objectValue === objectValue);
  if (!group) {
    const colors = groups.map(g => g.color);
    const color = COLORS.filter(c => !colors.includes(c))[0];
    group = new Group(objectValue, color);
    groups.push(group);
  }
  return group;
}
