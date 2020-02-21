import {
  BLUE_COLOR,
  checkAllWells,
  checkWell,
  Dimension,
  selectAllWells,
  selectWell,
  TURQOISE_COLOR,
  WHITE_COLOR
} from '../support/plate-models';

describe('Create Plate', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should fill some wells and print the plate into console', () => {
    checkAllWells('', WHITE_COLOR);
    selectWell(2, 3);
    cy.get('#field-object').select('One');
    checkWell(2, 3, 'One', TURQOISE_COLOR);
    cy.get('#other-field-object').select('Alpha');
    checkWell(2, 3, ['One', 'Alpha'], TURQOISE_COLOR);
    selectWell(1, 1);
    cy.get('#field-object').select('Two');
    checkWell(1, 1, 'Two', BLUE_COLOR);
    cy.get('#other-field-object').select('Beta');
    checkWell(1, 1, ['Two', 'Beta'], BLUE_COLOR);
    cy.get('button').contains('save').click();
    cy.get('#printed').should('have.text', ' Wells data printed into console ');
  });

  it('should fill all wells and clear them', () => {
    checkAllWells('', WHITE_COLOR);
    selectAllWells();
    cy.get('#field-object').select('Three');
    checkAllWells('Three', TURQOISE_COLOR);
    cy.get('#other-field-object').select('Gamma');
    checkAllWells(['Three', 'Gamma'], TURQOISE_COLOR);
    cy.get('#field-object').select('');
    checkAllWells('Gamma', WHITE_COLOR);
    cy.get('#other-field-object').select('');
    checkAllWells('', WHITE_COLOR);
  });

  it('should not clear wells contents when keyboard event target is not "body"', () => {
    checkAllWells('', WHITE_COLOR);
    selectWell(2, 3);
    cy.get('#field-object').select('One');
    checkWell(2, 3, 'One', TURQOISE_COLOR);
    cy.get('#barcode').type('barcode{backspace}');
    cy.get('#barcode').should('have.value', 'barcod');
    checkWell(2, 3, 'One', TURQOISE_COLOR);
    selectWell(2, 3);
    cy.get('body').type('{del}');
    checkWell(2, 3, '', WHITE_COLOR);
  });

  it('should show contents details on click', () => {
    cy.get('.content-details-box').should('not.exist');
    selectWell(1, 1);
    cy.get('.content-details-box').should('not.exist');
    cy.get('#field-object').select('One');
    cy.get('.content-details-box').should('contain', 'Main Object: One');
    cy.get('#other-field-object').select('Alpha');
    cy.get('.content-details-box').should('contain', `Main Object: One`).and('contain', 'Other Object: Alpha');
    cy.contains('.content-details-box button', '✕').click();
    cy.get('.content-details-box').should('not.exist');
  });

  it('should patch form on wells selection', () => {
    // this test checks the ability of the app to patch form data. So the lib is not concerned in this test
    selectWell(2, 3);
    cy.get('#field-object').select('Seven');
    selectWell(5, 3);
    cy.get('#other-field-object').select('Beta');
    selectWell(3, 6);
    cy.get('#field-object').select('Nine');
    cy.get('#other-field-object').select('Gamma');
    selectWell(1, 1);
    cy.get('#field-object').should('not.have.value');
    selectWell(2, 3);
    cy.get('#field-object').should('have.value', 'Seven');
    cy.get('#other-field-object').should('not.have.value');
    selectWell(5, 3);
    cy.get('#field-object').should('not.have.value');
    cy.get('#other-field-object').should('have.value', 'Beta');
    selectWell(3, 6);
    cy.get('#field-object').should('have.value', 'Nine');
    cy.get('#other-field-object').should('have.value', 'Gamma');
  });

  it('should disable form controls if no well was selected', () => {
    // this test checks the ability of the app to disable form controls. So the lib is not concerned in this test
    cy.get('#field-object').should('be.disabled');
    cy.get('#other-field-object').should('be.disabled');
    selectWell(1, 1, new Dimension(24));
    cy.get('#field-object').should('be.enabled');
    cy.get('#other-field-object').should('be.enabled');
    cy.get('body').type('{ctrl}', {release: false});
    selectWell(1, 1, new Dimension(24));
    cy.get('#field-object').should('be.disabled');
    cy.get('#other-field-object').should('be.disabled');
  });

});
