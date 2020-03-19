import {
  BARCODE_1,
  BARCODE_2,
  BLUE_COLOR_1,
  checkAllWells,
  checkColumn,
  DARK_COLOR,
  DARK_GREEN_COLOR,
  DARK_YELLOW_COLOR,
  mustBeReadonlyPlate,
  PINK_RED_COLOR,
  PURPLE_COLOR,
  RED_COLOR,
  selectAllWells,
  selectObject,
  TURQUOISE_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR,
} from '../support/plate-models';

describe('Display plate', () => {

  beforeEach(() => {
    cy.visit('/displayPlate');
  });

  it('should display a plate by clicking on its barcode', () => {
    checkAllWells('', WHITE_COLOR);
    selectPlate(BARCODE_1);
    checkPlate(BARCODE_1);
    mustBeReadonlyPlate();
    cy.get('span.badge span').should('have.text', '20');
    cy.get('.barcode').should('have.length', 20);
    cy.get('#barcode-filter').type(BARCODE_1.substring(0, 3));
    cy.get('span.badge span').should('have.text', '1');
    cy.get('.barcode').should('have.length', 1);
    cy.get('#barcode-filter').clear();
    cy.get('.barcode').should('have.length', 20);
    selectPlate(BARCODE_2);
    checkPlate(BARCODE_2, [1, 5, 10]);
    mustBeReadonlyPlate();
  });

  it('should switch between tabs (create and display) to check that things are reset properly between each', () => {
    checkAllWells('', WHITE_COLOR);
    selectPlate(BARCODE_1);
    checkPlate(BARCODE_1, [2, 4, 9]);
    cy.get('a').contains('Create').click();
    checkAllWells('', WHITE_COLOR);
    selectAllWells();
    selectObject('Seven');
    checkAllWells('Object num..', TURQUOISE_COLOR);
    cy.get('a').contains('Display').click();
    checkAllWells('', WHITE_COLOR);
  });

  it('should override the default truncate logic', () => {
    selectPlate(BARCODE_1);
    checkPlate(BARCODE_1, [0, 11]);
    cy.get('#override-truncate').click().should('be.checked');
    checkAllWells('Over-' + BARCODE_1.substring(0, 7));
  });

  it('should take control of the change detection in plate-maker', () => {
    cy.get('#control-tick').click().should('be.checked');
    selectPlate(BARCODE_2);
    checkAllWells(BARCODE_2.substring(0, 10) + '..');
    cy.contains('button', 'Tick').click();
    checkPlate(BARCODE_2, [2]);
    selectPlate(BARCODE_1);
    checkAllWells(BARCODE_1.substring(0, 10) + '..');
    selectPlate(BARCODE_2);
    checkPlate(BARCODE_2, [2]);
    selectPlate(BARCODE_1);
    checkAllWells(BARCODE_1.substring(0, 10) + '..');
    cy.contains('button', 'Tick').click();
    checkPlate(BARCODE_1, [4]);
    cy.get('#control-tick').click().should('not.be.checked');
    selectPlate(BARCODE_2);
    checkPlate(BARCODE_2, [2]);
    selectPlate(BARCODE_1);
    checkPlate(BARCODE_1, [4]);
  });

});


function selectPlate(barcode: string) {
  return cy.get('.barcode').contains(barcode).click();
}

function checkPlate(barcode: string, columns= [0, 6, 11]) {
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
