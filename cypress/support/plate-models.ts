import Chainable = Cypress.Chainable;

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

export function clickOnBootstrapCheckbox(chainable: Chainable) {
  // because Bootstrap use before and after pseudo-element to adjust label size that has initially 0*0 px
  // here we force the click because the element 'input' is being covered by another element 'label'
  // https://docs.cypress.io/guides/references/error-messages.html#cy-failed-because-the-element-cannot-be-interacted-with
  chainable.click({force: true});
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

export function checkAllWells(content: string | string[], bgColor?: string) {
  cy.get('.plate-col').then((well: JQuery<HTMLElement>) => checkWellContent(well, content, bgColor));
}

export function mustBeReadonlyPlate() {
  cy.get('.plate-col').then((well) => expect(well).to.css('cursor', 'not-allowed'));
}

export function selectPlate(barcode: string) {
  return cy.get('.barcode').contains(barcode).click();
}

export function checkPlate(barcode: string, columns = [0, 6, 11]) {
  const color = {
    0: TURQUOISE_COLOR,
    1: BLUE_COLOR_1,
    2: PURPLE_COLOR,
    4: RED_COLOR,
    5: DARK_YELLOW_COLOR,
    6: DARK_COLOR,
    9: PINK_RED_COLOR,
    10: DARK_GREEN_COLOR,
    11: YELLOW_COLOR,
  };
  for (const colIdx of columns) {
    const content = barcode + colIdx;
    checkColumn(colIdx + 1, '*' + (content).substring(content.length - 11, content.length), [8, 12], color[colIdx]);
  }
}

function checkColumn(col: number, content: string, shape: number[], bgColor?: string) {
  for (let i = col - 1; i < shape[0] * shape[1]; i += 2 * shape[1]) {  // check every other well to speed up tests a bit
    cy.get('.plate-col').eq(i).then(well => checkWellContent(well, content, bgColor));
    cy.wait(0);
  }
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
