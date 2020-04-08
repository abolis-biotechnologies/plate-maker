import {
  BARCODE_1,
  BARCODE_2,
  BLUE_COLOR_1,
  checkAllWells,
  checkPlate,
  checkWellContent,
  clickOnBootstrapCheckbox,
  mustBeReadonlyPlate,
  PURPLE_COLOR,
  selectAllWells,
  selectObject,
  selectPlate,
  TURQUOISE_COLOR,
  wellAt,
  WHITE_COLOR,
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
    const nbPlates = 21;
    cy.get('span.badge span').should('have.text', `${nbPlates}`);
    cy.get('.barcode').should('have.length', nbPlates);
    cy.get('#barcode-filter').type(BARCODE_1.substring(0, 3));
    cy.get('span.badge span').should('have.text', '1');
    cy.get('.barcode').should('have.length', 1);
    cy.get('#barcode-filter').clear();
    cy.get('.barcode').should('have.length', nbPlates);
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
    clickOnBootstrapCheckbox(cy.get('#override-truncate'));
    cy.get('#override-truncate').should('be.checked');
    checkAllWells('Over-' + BARCODE_1.substring(0, 7));
  });

  it('should take control of the change detection in plate-maker', () => {
    clickOnBootstrapCheckbox(cy.get('#control-tick'));
    cy.get('#control-tick').should('be.checked');
    selectPlate(BARCODE_2);
    checkAllWells(BARCODE_2.substring(0, 10) + '..');
    cy.contains('button', 'tick').click();
    checkPlate(BARCODE_2, [2]);
    selectPlate(BARCODE_1);
    checkAllWells(BARCODE_1.substring(0, 10) + '..');
    selectPlate(BARCODE_2);
    checkPlate(BARCODE_2, [2]);
    selectPlate(BARCODE_1);
    checkAllWells(BARCODE_1.substring(0, 10) + '..');
    cy.contains('button', 'tick').click();
    checkPlate(BARCODE_1, [4]);
    clickOnBootstrapCheckbox(cy.get('#control-tick'));
    cy.get('#control-tick').should('not.be.checked');
    selectPlate(BARCODE_2);
    checkPlate(BARCODE_2, [2]);
    selectPlate(BARCODE_1);
    checkPlate(BARCODE_1, [4]);
  });

  it('should truncate similar content parts, to explicit differences between wells', () => {
    // related to integration of fix https://github.com/burgaard/string-algorithms/pull/2
    selectPlate('mediums');
    const colors = {
      48: TURQUOISE_COLOR,
      108: BLUE_COLOR_1,
      168: PURPLE_COLOR,
    };
    [48, 108, 48, 108, 108, 168, 168].forEach((growth, index) => {
      wellAt(index + 1, 1).then(
        (well: JQuery) => checkWellContent(well, `oooo - ${growth}h`, colors[growth])
      );
      cy.wait(0);
    });
  });

});

