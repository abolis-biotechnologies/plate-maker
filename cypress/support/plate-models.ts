export const BARCODE_1 = 'BjDn8z9499rzIxEozO9m';
export const BARCODE_2 = 'cyVm8CccTNUi4EuKkwbM';
export const TURQOISE_COLOR = 'rgb(26, 188, 156)';
export const BLUE_COLOR = 'rgb(52, 152, 219)';
export const WHITE_COLOR = 'rgb(255, 255, 255)';

class WellLocation {
  constructor(public row: number,
              public col: number) {
  }
}

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

function selectWell(location: WellLocation, dimension: Dimension) {
  cy.get('dts-select-container').then((containers) => {
    const wellWidth = (containers[0].offsetWidth - 25) / dimension.cols();
    const wellHeight = (containers[0].offsetHeight - 25) / dimension.rows();
    cy.get('dts-select-container').click(wellWidth * location.col, wellHeight * location.row);
  });
}

/**
 * I (Zahen) could't make this function more sophisticated by using triggers 'mouseover' and 'mousemove' (Cypress does not want)
 * My idea was to provide the function with a start location, an end location and make drag to select between them using the mouse
 * Alternately, I selected wells (one by one) and clicked on them
 */
function selectWells(wells: WellLocation[], dimension: Dimension) {
  wells.forEach(well => {
    selectWell(well, dimension);
    cy.get('body').type('{ctrl}', {release: false});
  });
  cy.get('body').type('{ctrl}', {release: true});
}

function createWellLocations(by: string, size: number, index: number) {
  const wells = [];
  for (let i = 1; i <= size; i++) {
    if (by === 'row') {
      wells.push(new WellLocation(index, i));
    } else {
      wells.push(new WellLocation(i, index));
    }
  }
  return wells;
}

function getWellsbyColumn(index: number, dimension: Dimension) {
  return createWellLocations('col', dimension.rows(), index);
}

function getWellsByRow(index: number, dimension: Dimension) {
  return createWellLocations('row', dimension.cols(), index);
}

export function selectWellsByColumn(index: number, dimension: Dimension) {
  selectWells(getWellsbyColumn(index, dimension), dimension);
}

export function selectWellsByRow(index: number, dimension: Dimension) {
  selectWells(getWellsByRow(index, dimension), dimension);
}

export function selectAllWells() {
  cy.get('body').type('{ctrl}', {release: false}).get('.plate-col').click({multiple: true, timeout: 100000});
  cy.get('body').type('{ctrl}', {release: true});
}

export function checkWellsByColumn(columnIndex: number, content: string | string[], bgColor: string) {
  cy.get('dts-select-container .plate-row').then((rows) => {
    rows.each((index, row) => {
      if (content instanceof Array) {
        content.forEach(c => expect(row.children[columnIndex]).to.contain(c));
      } else {
        expect(row.children[columnIndex]).to.contain(content);
      }
      expect(row.children[columnIndex]).to.css('background-color', bgColor);
    });
  });
}

export function checkWellsByRow(rowIndex: number, content: string | string[], bgColor: string) {
  cy.get('dts-select-container .plate-row').then((rows) => {
    for (let i = 1; i < rows[rowIndex - 1].children.length; i++) {
      if (content instanceof Array) {
        content.forEach(c => expect(rows[rowIndex - 1].children[i]).to.contain(c));
      } else {
        expect(rows[rowIndex - 1].children[i]).to.contain(content);
      }
      expect(rows[rowIndex - 1].children[i]).to.css('background-color', bgColor);
    }
  });
}

export function checkAllWells(content: string | string[], bgColor?: string) {
  cy.get('.plate-col').then((well) => {
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
  });
}

export function mustBeReadonlyPlate() {
  cy.get('dts-select-container .plate-row').then((rows) => {
    rows.each((index, row) => {
      for (let i = 1; i < row.children.length; i++) {
        expect(row.children[i]).to.css('cursor', 'not-allowed');
      }
    });
  });
}
