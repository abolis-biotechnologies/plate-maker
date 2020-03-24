import {
  BLUE_COLOR_2,
  checkAllWells,
  checkWell,
  Dimension,
  selectAllWells,
  selectObject,
  selectOtherObject,
  selectWell,
  TURQUOISE_COLOR,
  WHITE_COLOR
} from '../support/plate-models';

describe('Create Plate', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should fill some wells and print the plate into console', () => {
    checkAllWells('', WHITE_COLOR);
    selectWell(2, 3);
    selectObject('Seven');
    checkWell(2, 3, 'Object num..', TURQUOISE_COLOR);
    selectOtherObject('Alpha');
    checkWell(2, 3, ['Object num..', 'Alpha gree..'], TURQUOISE_COLOR);
    selectWell(1, 1);
    selectObject('Two');
    checkWell(2, 3, ['*umber Seven', 'Alpha gree..'], TURQUOISE_COLOR);
    checkWell(1, 1, '* number Two', BLUE_COLOR_2);
    selectOtherObject('Beta');
    checkWell(1, 1, ['* number Two', 'Beta greek *'], BLUE_COLOR_2);
    cy.get('button').contains('save').click();
    cy.get('.saved-well').should('have.length', 2);
    cy.get('.saved-well').eq(0).should('have.text', ' (1, 1): Object number Two | Beta greek letter ');
    cy.get('.saved-well').eq(1).should('have.text', ' (2, 3): Object number Seven | Alpha greek letter ');
  });

  it('should fill all wells and clear them', () => {
    checkAllWells('', WHITE_COLOR);
    selectAllWells();
    selectObject('Three');
    checkAllWells('Object num..', TURQUOISE_COLOR);
    selectOtherObject('Gamma');
    checkAllWells(['Object num..', 'Gamma gree..'], TURQUOISE_COLOR);
    cy.get('#field-object').select('');
    checkAllWells('Gamma gree..', WHITE_COLOR);
    cy.get('#other-field-object').select('');
    checkAllWells('', WHITE_COLOR);
  });

  it('should not clear wells contents when keyboard event target is not "body"', () => {
    checkAllWells('', WHITE_COLOR);
    selectWell(2, 3);
    selectObject('One');
    checkWell(2, 3, 'Object num..', TURQUOISE_COLOR);
    cy.get('#barcode').type('barcode{backspace}');
    cy.get('#barcode').should('have.value', 'barcod');
    checkWell(2, 3, 'Object num..', TURQUOISE_COLOR);
    selectWell(2, 3);
    cy.get('body').type('{del}');
    checkWell(2, 3, '', WHITE_COLOR);
  });

  it('should show contents details on click', () => {
    cy.get('.content-details-box').should('not.exist');
    selectWell(1, 1);
    cy.get('.content-details-box').should('not.exist');
    selectObject('One');
    cy.get('.content-details-box').should('be.visible').and('contain', 'Main Object: Object number One');
    selectOtherObject('Alpha');
    cy.get('.content-details-box').should('be.visible').should('contain', `Main Object: Object number One`)
      .and('contain', 'Other Object: Alpha greek letter');
    cy.contains('.content-details-box button', '✕').click();
    cy.get('.content-details-box').should('not.exist');
  });

  it('should patch form on wells selection', () => {
    // this test checks the ability of the app to patch form data. So the lib is not concerned in this test
    selectWell(2, 3);
    selectObject('Seven');
    selectWell(5, 3);
    selectOtherObject('Beta');
    selectWell(3, 6);
    selectObject('Nine');
    selectOtherObject('Gamma');
    selectWell(1, 1);
    cy.get('#field-object').should('not.have.value');
    selectWell(2, 3);
    cy.get('#field-object').should('have.value', 'Object number Seven');
    cy.get('#other-field-object').should('not.have.value');
    selectWell(5, 3);
    cy.get('#field-object').should('not.have.value');
    cy.get('#other-field-object').should('have.value', 'Beta greek letter');
    selectWell(3, 6);
    cy.get('#field-object').should('have.value', 'Object number Nine');
    cy.get('#other-field-object').should('have.value', 'Gamma greek letter');
  });

  it('should disable form controls when no well is selected', () => {
    // this test checks the ability of the app to disable form controls. So the lib is not concerned in this test
    cy.get('#field-object').should('be.disabled');
    cy.get('#other-field-object').should('be.disabled');
    selectWell(1, 1, new Dimension(96));
    cy.get('#field-object').should('be.enabled');
    cy.get('#other-field-object').should('be.enabled');
    cy.get('body').type('{ctrl}', {release: false});
    selectWell(1, 1, new Dimension(96));
    cy.get('#field-object').should('be.disabled');
    cy.get('#other-field-object').should('be.disabled');
  });

  it('should support empty strings as a well contents', () => {
    selectWell(3, 3, new Dimension(96));
    cy.get('#other-field-object').select('');
    selectWell(3, 4, new Dimension(96));
    selectOtherObject('Alpha');
    checkWell(3, 3, '', WHITE_COLOR);
    checkWell(3, 4, 'Alpha gree..', WHITE_COLOR);
  });

});
