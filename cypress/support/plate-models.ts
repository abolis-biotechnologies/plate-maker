export const BARCODE_1 = 'BjDn8z9499rzIxEozO9m';
export const BARCODE_2 = 'cyVm8CccTNUi4EuKkwbM';

export const TURQUOISE_COLOR = 'rgb(26, 188, 156)';
export const BLUE_COLOR_1 = 'rgb(52, 152, 219)';
export const PURPLE_COLOR = 'rgb(155, 89, 182)';
export const RED_COLOR = 'rgb(230, 51, 26)';
export const DARK_COLOR = 'rgb(44, 62, 80)';
export const DARK_YELLOW_COLOR = 'rgb(230, 179, 51)';
export const PINK_RED_COLOR = 'rgb(255, 26, 102)';
export const DARK_GREEN_COLOR = 'rgb(77, 128, 102)';
export const YELLOW_COLOR = 'rgb(255, 225, 122)';
export const BLUE_COLOR_2 = 'rgb(52, 152, 219)';
export const WHITE_COLOR = 'rgb(255, 255, 255)';

export class Dimension {
  constructor(public size: number) {
  }

  rows(): number {
    switch (this.size) {
      case 96:
        return 8;
      case 24:
        return 4;
      default:
        return 0;
    }
  }

  cols(): number {
    switch (this.size) {
      case 96:
        return 12;
      case 24:
        return 6;
      default:
        return 0;
    }
  }
}

export function selectWell(row: number, col: number, dimension = new Dimension(96)) {
  cy.get('dts-select-container').then((containers) => {
    const wellWidth = (containers[0].offsetWidth - 25) / dimension.cols();
    const wellHeight = (containers[0].offsetHeight - 25) / dimension.rows();
    cy.get('dts-select-container').click(wellWidth * col, wellHeight * row);
  });
}

export function selectAllWells() {
  cy.get('body').type('{ctrl}', {release: false}).get('.plate-col').click({multiple: true, timeout: 100000});
  cy.get('body').type('{ctrl}', {release: true});
}

export function selectObject(textNumber: string) {
  return cy.get('#field-object').select(`Object number ${textNumber}`);
}

export function selectOtherObject(letterName: string) {
  return cy.get('#other-field-object').select(`${letterName} greek letter`);
}

export function checkWell(row: number, col: number, content: string | string[], bgColor: string, nbCols = 12) {
  cy.get('.plate-col').eq((row - 1) * nbCols + (col - 1)).then(well => checkWellContent(well, content, bgColor));
}

export function checkColumn(col: number, content: string, shape: number[], bgColor?: string) {
  for (let i = col - 1; i < shape[0] * shape[1]; i += 2 * shape[1]) {  // check every other well to speed up tests a bit
    cy.get('.plate-col').eq(i).then(well => checkWellContent(well, content, bgColor));
    cy.wait(0);
  }
}

export function checkAllWells(content: string | string[], bgColor?: string) {
  cy.get('.plate-col').then((well: JQuery<HTMLElement>) => checkWellContent(well, content, bgColor));
}

export function mustBeReadonlyPlate() {
  cy.get('.plate-col').then((well) => expect(well).to.css('cursor', 'not-allowed'));
}

function checkWellContent(well: JQuery<HTMLElement>, content: string | string[], bgColor?: string) {
  if (content instanceof Array) {
    content.forEach(c => expect(well).to.contain(c));
  } else {
    expect(well).to.contain(content);
  }
  if (bgColor) {
    expect(well).to.css('background-color', bgColor);
  } else {
    expect(well).to.not.css('background-color', WHITE_COLOR);
  }
}
