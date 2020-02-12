import {
  BARCODE_1,
  BARCODE_2,
  checkAllWells,
  mustBeReadonlyPlate,
  selectAllWells,
  TURQOISE_COLOR,
  WHITE_COLOR
} from '../support/plate-models';

describe('Display plate', () => {

  beforeEach(() => {
    cy.visit('/displayPlate');
  });

  it('should display a plate by clicking on its barcode', () => {
    checkAllWells('', WHITE_COLOR);
    cy.get('.barcode').contains(BARCODE_1).click();
    checkAllWells(BARCODE_1.substring(0, 9) + '...');
    mustBeReadonlyPlate();
    cy.get('span.badge span').should('have.text', '20');
    cy.get('.barcode').should('have.length', 20);
    cy.get('#barcode-filter').type(BARCODE_1.substring(0, 3));
    cy.get('span.badge span').should('have.text', '1');
    cy.get('.barcode').should('have.length', 1);
    cy.get('#barcode-filter').clear();
    cy.get('.barcode').should('have.length', 20);
    cy.get('.barcode').contains(BARCODE_2).click();
    checkAllWells(BARCODE_2.substring(0, 9) + '...');
    mustBeReadonlyPlate();
  });

  it('should switch between tabs (create and display) to check that things are reset properly between each', () => {
    checkAllWells('', WHITE_COLOR);
    cy.get('.barcode').contains(BARCODE_1).click();
    checkAllWells(BARCODE_1.substring(0, 9) + '...');
    cy.get('a').contains('Create').click();
    checkAllWells('', WHITE_COLOR);
    selectAllWells();
    cy.get('#field-object').select('Seven');
    checkAllWells('Seven', TURQOISE_COLOR);
    cy.get('a').contains('Display').click();
    checkAllWells('', WHITE_COLOR);
  });

});
