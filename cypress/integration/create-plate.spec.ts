import {
  BLUE_COLOR,
  checkAllWells,
  checkWellsByColumn,
  checkWellsByRow,
  Dimension,
  selectAllWells,
  selectWellsByColumn,
  selectWellsByRow,
  TURQOISE_COLOR,
  WHITE_COLOR
} from '../support/plate-models';

describe('Create Plate', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should fill some wells and print the plate into console', () => {
    const dimension = new Dimension(96);
    const index = 1;
    checkWellsByColumn(index, '', WHITE_COLOR);
    selectWellsByColumn(index, dimension);
    cy.get('#field-object').select('One');
    checkWellsByColumn(index, 'one', TURQOISE_COLOR);
    cy.get('#other-field-object').select('Alpha');
    checkWellsByColumn(index, ['one', 'alpha'], TURQOISE_COLOR);
    selectWellsByRow(index, dimension);
    cy.get('#field-object').select('Two');
    checkWellsByRow(index, 'two', BLUE_COLOR);
    cy.get('#other-field-object').select('Beta');
    checkWellsByRow(index, ['two', 'beta'], BLUE_COLOR);
    cy.get('button').contains('save').click();
    cy.get('#printed').should('have.text', ' Wells data printed into console ');
  });

  it('should fill all wells and clear them', () => {
    checkAllWells('', WHITE_COLOR);
    selectAllWells();
    cy.get('#field-object').select('Three');
    checkAllWells('three', TURQOISE_COLOR);
    cy.get('#other-field-object').select('Gamma');
    checkAllWells(['three', 'gamma'], TURQOISE_COLOR);
    // because cy.get('body').type('{del}') does not work to trigger delete keypress (reason?), I (Zahen) cleared the wells manually
    cy.get('#field-object').select('');
    checkAllWells('gamma', WHITE_COLOR);
    cy.get('#other-field-object').select('');
    checkAllWells('', WHITE_COLOR);
  });

});
